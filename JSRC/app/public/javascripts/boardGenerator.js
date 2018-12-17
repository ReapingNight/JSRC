var boardPlaceholder;
var chessBorder;
var graveyard;

//This function generates the black board into the document
function generateBlack(blind)
{
    let temp = new Array(64);
    let index = 0;
    for(let ii = 0; ii <= 63; ii++)
    {
        temp[index++] = "<div class='boardTile' onclick='select(this.id)' style='background-size: " + !blind * 50 + "%' id='"
            + ii + "'>" + "</div>";
    }
    chessBorder.style.backgroundImage = "url('images/boardBlack.png')";

    boardPlaceholder.innerHTML = temp.join("");
    graveyard[0].id = "-1";
    graveyard[1].id = "64";
    placePieces();
    setYourTurn(false);
}
//This function generates the white board into the document
function generateWhite(blind)
{
    let temp = new Array(64);
    let index = 0;
    for(let ii = 63; ii >= 0; ii--)
    {
        temp[index++] = "<div class='boardTile' onclick='select(this.id)' style='background-size: " + !blind * 50 + "%' id='"
            + ii + "'>" + "</div>";
    }
    chessBorder.style.backgroundImage = "url(images/boardWhite.png)";

    boardPlaceholder.innerHTML = temp.join("");
    graveyard[0].id = "64";
    graveyard[1].id = "-1";
    placePieces();
}

//Function that generates the pieces based on server database
function placePieces()
{
    $.getJSON("/start", function(pieces){
        $.each(pieces, function(index, piece)
        {
            //window.alert(piece.position);
            $('#' + piece.position).css('background-image', 'url(images/pieces/'+ piece.color + piece.type + '.png)');
        });
    });
}

//This function checks what board to generate
function generateBoard(boardColour, blind) //0-Black, 1-White
{
    chessBorder = document.getElementById("chessBorder");
    boardPlaceholder = document.getElementById("board");
    graveyard = document.getElementById("graveyard").children;

    if(boardColour === 0)
    {
        generateBlack(blind);
    }
    else
    {
        generateWhite(blind);
    }
    updateTurnSign();
}