
var indexRouter = require("./routes/index");
var url = require("url");
var express = require("express");
var http = require("http");
var websocket = require("ws");
var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);

app.get("/", indexRouter);


const wss = new websocket.Server({server, path:"game.html"});

wss.on("connection", function(wss) {

    
       
        wss.send("ServerMessage");
        wss.close();
        
});


   

server.listen(port);