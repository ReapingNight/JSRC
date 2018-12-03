var yourTurn = true;
var firstSelect;
var secondSelect;
var numSelected = 0;
var socket;

//This function selects the clicked div and checks if enough has been selected to send to server
function select(id)
{
    if(yourTurn)
    {
        switch(numSelected % 2)
        {
            case 0:
                firstSelect = document.getElementById(id).id;
                numSelected++;
                break;
            case 1:
                secondSelect = document.getElementById(id).id;
                numSelected++;
                break;
            default:
                break;
        }

        if(numSelected % 2 == 0)
        {
            //window.alert("Sending " + firstSelect + ":" + secondSelect);
            socket.send(firstSelect + secondSelect);
        }
    }
}

(function setup(){
    socket = new WebSocket(Setup.WEB_SOCKET_URL);

    socket.onmessage = function(event)
    {
        window.alert(event.data);
    }
})();