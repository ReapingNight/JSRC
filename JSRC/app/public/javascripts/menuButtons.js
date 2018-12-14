//Global variables
var optionsID;
var infoID;
var simulList;
var simulActive;
var timerActive;
//Initializes upon loading the page
window.onload = function()
{
    optionsID = document.getElementById("info_options");
    infoID = document.getElementById("info_howToPlay");
    blindActive = false;
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

//Sets blindActive to true
function checkBlind()
{
    blindActive = true;
}
//Sets blindActive to false
function uncheckBlind()
{
    blindActive = false;
}
function play()
{
    blind = blindActive;
    window.location.href = "game?b=" + blind;
}