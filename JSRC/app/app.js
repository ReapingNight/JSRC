
var indexRouter = require("./routes/index");
var url = require("url");
var express = require("express");
var http = require("http");
var websocket = require("ws");
var port = process.argv[2];
var app = express();
var settings;

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);

var numGames = 0;
var boardModule = require("chess-board");

app.get("/game", indexRouter);
app.get("/", indexRouter);

//Route for sending starting json with all the pieces in place
app.get("/start", function(req, res){
        res.json(boardModule().board);
});

//Catch any stray url paths
app.get("*", indexRouter);


const wss = new websocket.Server({server});
var playerQueue = [];
var games = [];

//What to do on connection
wss.on("connection", function(ws) {

        ws.onclose = function(event)
        {
                console.log("Connection closed with a player")
                playerQueue.splice(playerQueue.indexOf(event), 1);
        };
        //ws.send("ALERT Connected");
        console.log("connected");
        ws.on("message", function(data){
                console.log(data.toString());
                let words = data.split(" ");
                switch(words[0])
                {
                        case "MOVE":
                                let positions = words[1].split(",");
                                let thisGame = findGame(ws);
                                let temp = thisGame.move(positions[0], positions[1]);

                                if(temp !== null)
                                {
                                        //console.log("Confirm move: " + positions[0] + ":" + positions[1])
                                        thisGame.players[0].send("MAKE_MOVE " + JSON.stringify(temp));
                                        thisGame.players[1].send("MAKE_MOVE " + JSON.stringify(temp));
                                }
                                else
                                {
                                        ws.send("INVALID_MOVE");
                                }
                                break;
                        case "OPTIONS":
                                settings = JSON.parse(words[1]);
                                var player = {id:ws, options:settings};
                                playerQueue.push(player);
                                console.log(playerQueue.length);
                                for(var i=0; i<playerQueue.length ; i++)
                                {
                                        if((settingEquals(playerQueue[i].options, player.options) == true) && ((playerQueue[i].id == player.id) == false))
                                        {
                                                console.log("Found!");
                                                startGame(playerQueue[i], player, player.options);
                                        }
                                }
                               break; 
                        default:
                                console.log("Command not found");
                                break;
                }
        });
});

function startGame(playerOne, playerTwo, options)
{     
        //console.log(JSON.stringify(board));
        let temp = require("chess-game").newGame(numGames++, [playerOne.id, playerTwo.id], boardModule().board, options, 0);
        temp.move = boardModule().move(temp.board);
        games.push(temp);

        playerQueue.splice(getFirstIndex(playerQueue, playerOne), 1);
        playerQueue.splice(getFirstIndex(playerQueue, playerTwo), 1);
        console.log("Starting game: " + temp.id);
        temp.players[0].send("GENERATE 0");
        temp.players[1].send("GENERATE 1");
}



function settingEquals(settingsOne, settingsTwo)
{
        if((settingsOne.Simultanious == settingsTwo.Simultanious) && (settingsOne.Timer == settingsTwo.Timer) && (settingsOne.Blind == settingsTwo.Blind)) 
        {
        return true;
        }
        else return false;
}

//Finds an object in an array based on an attribute of said object
function findGame(value)
{
        for(let ii = 0; ii < games.length; ii++)
        {
                if(games[ii].players[0] === value || games[ii].players[1] === value)
                {
                        return games[ii];
                }
        }
}

function getFirstIndex(array, value)
{
        for(let ii = 0; ii < array.length; ii++)
        {
                if(array[ii] === value)
                {
                        return ii;
                }
        }

        return -1;
}

server.listen(port);