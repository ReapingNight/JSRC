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
            let sub = words[1].split("_");
            generateBoard(parseInt(sub[0]), (sub[1] == "true"));
            setYourTurn(Boolean(parseInt(words[1])));
        }
        if(words[0] === "TURN")
        {
            setYourTurn();
        }
        if(words[0] === "END")
        {
            window.alert((parseInt(words[1]) > 0)? "White wins" : "Black wins");
        }
    }
}

function createSocket()
{
    socket.send("OPTIONS " + JSON.stringify(CreateMatch()));
    getMessage();
}