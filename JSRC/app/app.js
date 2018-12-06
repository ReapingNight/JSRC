
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

var board = [
        {color: 0, type:1, position: 63},
        {color: 0, type:2, position: 62},
        {color: 0, type:3, position: 61},
        {color: 0, type:5, position: 60},
        {color: 0, type:4, position: 59},
        {color: 0, type:3, position: 58},
        {color: 0, type:2, position: 57},
        {color: 0, type:1, position: 56},
        {color: 0, type:0, position: 55},
        {color: 0, type:0, position: 54},
        {color: 0, type:0, position: 53},
        {color: 0, type:0, position: 52},
        {color: 0, type:0, position: 51},
        {color: 0, type:0, position: 50},
        {color: 0, type:0, position: 49},
        {color: 0, type:0, position: 48},

        {color: 1, type:1, position: 0},
        {color: 1, type:2, position: 1},
        {color: 1, type:3, position: 2},
        {color: 1, type:4, position: 3},
        {color: 1, type:5, position: 4},
        {color: 1, type:3, position: 5},
        {color: 1, type:2, position: 6},
        {color: 1, type:1, position: 7},
        {color: 1, type:0, position: 8},
        {color: 1, type:0, position: 9},
        {color: 1, type:0, position: 10},
        {color: 1, type:0, position: 11},
        {color: 1, type:0, position: 12},
        {color: 1, type:0, position: 13},
        {color: 1, type:0, position: 14},
        {color: 1, type:0, position: 15}
]

app.get("/game", indexRouter);
app.get("/", indexRouter);

//Route for sending starting json with all the pieces in place
app.get("/start", function(req, res){
        res.json(board);
});

//Catch any stray url paths
app.get("*", indexRouter);


const wss = new websocket.Server({server});
var players = [];

//What to do on connection
wss.on("connection", function(ws) {
        
        ws.send("Connected");
        console.log("connected");
        //What to do when receiving a message from a connected player
        // ws.on("message", function(data) {
        //         //Make player object with selected options and identifier
        //         var player = {id:ws, options:data}
        //         players.push(player)
        //         playerCount++;
        //         ws.send(data);
        //         console.log("received message");
        //         if ((playerCount % 2) == 0)
        //         {
        //                 startGame(players[(playerCount-1)].id, players[(playerCount-2)].id);
        //         }    
        // });
        ws.on("message", function(data){
                console.log(data.toString());
                let words = data.split(" ");
                switch(words[0])
                {
                        case "MOVE":
                                console.log(words[1]);
                                break;
                        default:
                                console.log("Command not found");
                                break;
                }
        });
});

function startGame(playerOne, playerTwo)
{     
        playerOne.send("Start");
        playerTwo.send("Start");
}
   

server.listen(port);