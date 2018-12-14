//Send Options
function CreateMatch()
{
var URLString = ""+window.location;
var query = URLString.split("?");
var Params = query[1].split("&");
var BlindString = Params[0];
var blind = BlindString.split("=")[1];

let board = document.getElementById("board");
board.innerHTML = "<img src=\"images/loading-icon.gif\" alt=\"Loading...\" />";

//Test Code!---------------------------------------------------------------------------
//Send the server a message when establishing conection

    var Settings =
    {
        blind : blind
    };
    
    return Settings;
}
//Test end-----------------------------------------------------------------------------
//
