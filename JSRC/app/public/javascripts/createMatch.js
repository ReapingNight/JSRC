//Send Options
function CreateMatch()
{
//window.alert("CREATE!");
var URLString = ""+window.location;
var query = URLString.split("?");
var Params = query[1].split("&");
var SimulString = Params[0];
var TimerString = Params[1];
var BlindString = Params[2];
var simultan = SimulString.split("=")[1];
var timer = TimerString.split("=")[1];
var blind = BlindString.split("=")[1];


//Test Code!---------------------------------------------------------------------------
//Send the server a message when establishing conection

    var Settings =
    {
        Simultanious : simultan, Timer : timer, Blind : blind
    };
    
    return Settings;
}
//Test end-----------------------------------------------------------------------------
//
