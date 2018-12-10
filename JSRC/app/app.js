
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

var board = require("chess-board");

app.get("/game", indexRouter);
app.get("/", indexRouter);

//Route for sending starting json with all the pieces in place
app.get("/start", function(req, res){
        res.json(board.board);
});

//Catch any stray url paths
app.get("*", indexRouter);


const wss = new websocket.Server({server});
var players = [];

//What to do on connection
wss.on("connection", function(ws) {
        
        ws.send("Connected");
        console.log("connected");
        ws.on("message", function(data){
                console.log(data.toString());
                let words = data.split(" ");
                switch(words[0])
                {
                        case "MOVE":
                                let positions = words[1].split(",");
                                let temp = board.move(positions[0], positions[1]);
                                if(temp !== null)
                                {
                                        ws.send("MAKE_MOVE " + JSON.stringify(temp));
                                }
                                else
                                {
                                        ws.send("INVALID_MOVE");
                                }
                                break;
                        case "OPTIONS":
                                settings = JSON.parse(words[1]);
                                var player = {id:ws, options:settings};
                                players.push(player);
                                console.log(players.length);
                                for(var i=0; i<players.length ; i++)
                                {
                                        if((settingEquals(players[i].options, player.options) == true) && ((players[i].id == player.id) == false))
                                        {
                                                console.log("Found!");
                                                startGame(players[i], player, player.options);
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
        let game = require("chess-game").newGame(numGames++, [playerOne.id, playerTwo.id], options, 0);

        players.splice(playerOne);
        players.splice(playerTwo);
        console.log("Starting game: " + game.id);
        game.players[0].send("GENERATE 0");
        game.players[1].send("GENERATE 1");
}

function settingEquals(settingsOne, settingsTwo)
{
        if((settingsOne.Simultanious == settingsTwo.Simultanious) && (settingsOne.Timer == settingsTwo.Timer) && (settingsOne.Blind == settingsTwo.Blind)) 
        {
        return true;
        }
        else return false;
}
   

server.listen(port);