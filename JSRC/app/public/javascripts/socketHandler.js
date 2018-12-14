function getMessage(){
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
            clockHandler();
        }
        if(words[0] === "TURN")
        {
            setYourTurn();
        }
    }
}

function createSocket()
{
    socket.send("OPTIONS " + JSON.stringify(CreateMatch()));
    getMessage();
}