//Game setup
var WEB_SOCKET_URL = "ws://localhost:3000";
var socket = new WebSocket(WEB_SOCKET_URL);

(function messageHandler(){
    socket.onmessage = function(message)
    {
        let words = message.data.split(" ");
        if(words[0] === "MAKE_MOVE")
        {
            mover(words[1]);
        }
        if(words[0] === "ALERT")
        {
            window.alert(words[1]);
        }
        if(words[0] === "GENERATE")
        {
            generateBoard(parseInt(words[1]));
            setYourTurn(Boolean(parseInt(words[1])));
        }
    }
})()