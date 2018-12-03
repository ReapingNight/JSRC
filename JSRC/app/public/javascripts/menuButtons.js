//Global variables
var optionsID;
var infoID;
var simulList;
//Initializes upon loading the page
window.onload = function()
{
    optionsID = document.getElementById("info_options");
    infoID = document.getElementById("info_howToPlay");
    simulList = document.getElementById("simulOption");
    timerList = document.getElementById("timerOption");
    simulActive = false;
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
//Shows the simultanious list and sets simulActive to true
function checkSimultan()
{
    simulList.style.display = 'block';
    simulActive = true;
}
//Hides the simultanious list and sets simulActive to false
function uncheckSimultan()
{
    simulList.style.display = 'none';
    simulActive = false;
}
//Test Code!---------------------------------------------------------------------------
function michael()
{
    //Still in progress, now shows some options data in windowalert.
    Simultan = simulList.value;
    timer = timerList.value;
    if(simulActive == false)
    {
        Simultan = 1
    }
    window.alert(Simultan);
    window.alert(timer);

    //Create websocket to establish connection with server
    var socket = new WebSocket("ws://145.94.222.143:3000");

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
//
}

