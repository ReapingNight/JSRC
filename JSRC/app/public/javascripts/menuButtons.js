//Global variables
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



//Test Code!---------------------------------------------------------------------------
function michael()
{
    //Create Options object
    

    //Create websocket to establish connection with server
    var socket = new WebSocket("ws://192.168.0.35:3000");

    //What to do when receiving a message from the server
    socket.onmessage = function(event){
        if (event.data == "Connected")
        {
            socket.send("MyOptions")
            window.alert(event.data)
        }
        if (event.data == "Start")
        {
            pressHowToPlay();
            window.alert(event.data)
        }
        if (event.data == "MyOptions")
        {
            window.alert(event.data)
        }
    }

    //Send the server a message when establishing conection
    socket.onopen = function()
    {
        //No content yet
    }
//Test end-----------------------------------------------------------------------------
}

