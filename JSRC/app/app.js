
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
                let thisGame = findGame(ws);
                {
                        //End game
                        if (thisGame && (thisGame.status === 0))
                        {
                                if (ws == thisGame.players[0])
                                {
                                        thisGame.status = 1;
                                        thisGame.players[1].send("END " + thisGame.status);
                                }
                                if (ws == thisGame.players[1])
                                {
                                        thisGame.status = -1;
                                        thisGame.players[0].send("END " + thisGame.status);
                                }
                        }
                }

        };
        //ws.send("ALERT Connected");
        console.log("connected");
        ws.on("message", function(data){
                console.log(data.toString());
                let words = data.split(" ");
                switch(words[0])
                {
                        case "MOVE":
                                //Check if there was a piece on the selected tile
                                let positions = words[1].split(",");
                                let thisGame = findGame(ws);
                                if(thisGame.status !== 0)
                                {
                                        return;
                                }
                                let temp = thisGame.move(positions[0], positions[1], getFirstIndex(thisGame.players, ws));

                                if(temp !== null)
                                {
                                        for(const ii in temp)
                                        {
                                                //Check if king was captured
                                                if(temp[ii].type === 5 && (temp[ii].position < 0 || temp[ii].position > 63))
                                                {
                                                        //End game
                                                        thisGame.status = Math.pow((-1), temp[ii].color);
                                                        thisGame.players[0].send("END " + thisGame.status);
                                                        thisGame.players[1].send("END " + thisGame.status);
                                                }
                                                
                                                //Move all the pieces
                                                thisGame.players[0].send("MAKE_MOVE " + JSON.stringify(temp[ii]));
                                                thisGame.players[1].send("MAKE_MOVE " + JSON.stringify(temp[ii]));
                                        }
                                        //Change turns
                                        thisGame.players[0].send("TURN");
                                        thisGame.players[1].send("TURN");
                                }
                                else
                                {
                                        ws.send("INVALID_MOVE");
                                }
                                break;
                        case "OPTIONS":
                                //Retrieve settings from message
                                settings = JSON.parse(words[1]);
                                var player = {id:ws, options:settings};
                                playerQueue.push(player);
                                console.log(playerQueue.length);

                                //Check all players in queue for match
                                for(var i=0; i<playerQueue.length ; i++)
                                {
                                        //If match, start game with those players
                                        if((settingEquals(playerQueue[i].options, player.options) === true) && ((playerQueue[i].id === player.id) === false))
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
        //Generate new game with players
        let temp = require("chess-game").newGame(numGames++, [playerOne.id, playerTwo.id], boardModule().board, options, 0);
        temp.move = boardModule().move(temp.board);
        games.push(temp);

        playerQueue.splice(getFirstIndex(playerQueue, playerOne), 1);
        playerQueue.splice(getFirstIndex(playerQueue, playerTwo), 1);
        console.log("Starting game: " + temp.id + ", Blind:" + options.blind);
        temp.players[0].send("GENERATE 0_" + options.blind);
        temp.players[1].send("GENERATE 1_" + options.blind);
}

//Checks if settings are equal
function settingEquals(settingsOne, settingsTwo)
{
        if(settingsOne.blind == settingsTwo.blind)
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

//Returns first index of value in array
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