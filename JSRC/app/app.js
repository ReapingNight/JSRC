
var indexRouter = require("./routes/index");
var url = require("url");
var express = require("express");
var http = require("http");
var websocket = require("ws");
var port = process.argv[2];
var app = express();
var playerCount = 0;
app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);


app.get("/game", indexRouter);
app.get("*", indexRouter);


const wss = new websocket.Server({server});
var players = [];

//What to do on connection
wss.on("connection", function(ws) {
        
        ws.send("Connected");
        console.log("connected");
        //What to do when receiving a message from a connected player
        ws.on("message", function(data) {
                //Make player object with selected options and identifier
                var player = {id:ws, options:data}
                players.push(player)
                playerCount = playerCount + 1
                ws.send(data);
                console.log("received message");
                if ((playerCount % 2) == 0)
                {
                        startGame(players[(playerCount-1)].id, players[(playerCount-2)].id);
                }    
        });
});

function startGame(playerOne, playerTwo)
{     
        playerOne.send("Start");
        playerTwo.send("Start");
}
   

server.listen(port);