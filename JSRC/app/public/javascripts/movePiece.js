var yourTurn = true;
var firstSelect;
var secondSelect;
var numSelected = 0;

//This function selects the clicked div and checks if enough has been selected to send to server
function select(id)
{
    if(yourTurn)
    {
        switch(numSelected % 2)
        {
            case 0:
                firstSelect = document.getElementById(id);
                highlightTile(0, firstSelect, "green");
                numSelected++;
                break;
            case 1:
                secondSelect = document.getElementById(id);
                highlightTile(0, secondSelect, "green");
                numSelected++;
                break;
            default:
                break;
        }

        if(numSelected % 2 == 0)
        {
            //Function to move selected piece
            socket.send("MOVE " + firstSelect.id + "," + secondSelect.id);
            highlightTile(2, firstSelect, secondSelect);
        }
    }
}

/** Function that highlights a tile
 * args: type, requires extra arguments
 * type:    0 - tile, color
 *          1 - tile
 *          2 - tile, tile
 */
function highlightTile(type)
{
    switch(type)
    {
        case 0:
            //Select first tile
            arguments[1].style.border = "0.25vw groove " + arguments[2];
            break;
        case 1:
            //Deselect tile
            arguments[1].style.border = "none";
            break;
        case 2:
            //Deselect all tiles
            arguments[1].style.border = "none";
            arguments[2].style.border = "none";
            break;
        default:
            break;
    }

}

//Function that moves a piece form one tile to another
function mover(obj)
{
    let piece = JSON.parse(obj);
    $('#' + piece.posOld).css('background-image', 'none');
    $('#' + piece.position).css('background-image', 'url(images/pieces/' + piece.color + piece.type + '.png)');

    yourTurn = !yourTurn;
    updateTurnSign();
}

function setYourTurn(val)
{
    yourTurn = val;
}

function updateTurnSign()
{
    let turnTextDiv = document.getElementById("turnText");

    turnTextDiv.innerText = (yourTurn) ? "Your Turn" : "Opponent\'s Turn";
}