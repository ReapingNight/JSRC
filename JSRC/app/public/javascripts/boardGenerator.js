var gamePlaceholder;

//This function generates the black board into the document
function generateBlack()
{
    let temp = new Array(64);
    let index = 0;
    for(let ii = 1; ii <= 8; ii++)
    {
        for(let jj = 72; jj >= 65; jj--)
        {
            //temp += "<div id='" + String.fromCharCode(jj) + ii + "'></div>"
            temp[index] = "<div id='" + String.fromCharCode(jj) + ii + "'>" + String.fromCharCode(jj) + ii + "</div>";
            index++;
        }       
    }

    gamePlaceholder.innerHTML = temp.join(" ");
}
//This function generates the white board into the document
function generateWhite()
{
    let temp = new Array(64);
    let index = 0;
    for(let ii = 8; ii >= 1; ii--)
    {
        for(let jj = 65; jj <= 72; jj++)
        {
            temp[index] = "<div id='" + String.fromCharCode(jj) + ii + "'>" + String.fromCharCode(jj) + ii + "</div>";
            index++;
        }
    }

    gamePlaceholder.innerHTML = temp.join(" ");
}

//This function checks what board to generate
function generateBoard(boardColour) //0-Black, 1-White
{
    if(boardColour == 0)
    {
        generateBlack();
    }
    else
    {
        generateWhite();
    }
}

//Main function that executes on pageload
window.onload = function()
{
    gamePlaceholder = document.getElementById("chessBorder");
}