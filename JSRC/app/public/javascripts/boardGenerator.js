var boardPlaceholder;
var chessBorder;

//This function generates the black board into the document
function generateBlack()
{
    chessBorder = document.getElementById("chessBorder");
    boardPlaceholder = document.getElementById("board");

    let temp = new Array(64);
    let index = 0;
    for(let ii = 0; ii <= 63; ii++)
    {
        temp[index++] = "<div class='boardTile' onclick='select(this.id)' id='"
            + ii + "'>" + "</div>";
    }
    chessBorder.style.backgroundImage = "url('images/boardBlack.png')";

    boardPlaceholder.innerHTML = temp.join("");
    placePieces();
    setYourTurn(false);
}
//This function generates the white board into the document
function generateWhite()
{
    chessBorder = document.getElementById("chessBorder");
    boardPlaceholder = document.getElementById("board");

    let temp = new Array(64);
    let index = 0;
    for(let ii = 63; ii >= 0; ii--)
    {
        temp[index++] = "<div class='boardTile' onclick='select(this.id)' id='"
            + ii + "'>" + "</div>";
    }
    chessBorder.style.backgroundImage = "url(images/boardWhite.png)";

    boardPlaceholder.innerHTML = temp.join("");
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
function generateBoard(boardColour) //0-Black, 1-White
{
    if(boardColour === 0)
    {
        generateBlack();
    }
    else
    {
        generateWhite();
    }
    updateTurnSign();
}