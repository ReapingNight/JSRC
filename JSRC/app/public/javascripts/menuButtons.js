var optionsID;
var infoID;

//Initializes upon loading the page
window.onload = function()
{
    optionsID = document.getElementById("info_options");
    infoID = document.getElementById("info_howToPlay");
}

//Toggles the how to play button and turns off options
function pressHowToPlay()
{
    if (infoID.style.display == 'none')
    {
        infoID.style.display = 'block';
        optionsID.style.display = 'none';
    }
    else
    {
        infoID.style.display = 'none';    
    }
//TEST CODE!
//---------------------------------------------------------------------------
//Create websocket to establish connection with server
    var socket = new WebSocket("ws://145.94.153.155:3000");

            socket.onmessage = function(event){
                //What to do when receiving a message from the server
                pressHowToPlay();
                socket.close();
            }

            socket.onopen = function(){
                //Send the server a message when establishing conection
                socket.send("Client Message");
               
            }
//Test end-----------------------------------------------------------------  
}

//Toggles the options button and turns off howToPlay
function pressOptions()
{
    if (optionsID.style.display == 'none')
    {
        optionsID.style.display = 'block';
        infoID.style.display = 'none';
    }
    else
    {
        optionsID.style.display = 'none';
    }
}
