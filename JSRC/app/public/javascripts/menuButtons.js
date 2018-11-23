var optionsID;
var infoID;
var check;
window.onload = function()
{
optionsID = document.getElementById("info_options");
infoID = document.getElementById("info_howToPlay");
check = document.getElementById("simulNo");
}

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
function checkYesSimultan()
{
    //window.alert("gsgfdgsfdsgf");
    //check.checked = false;

}