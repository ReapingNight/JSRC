var playerTime = 0; //min:sec.mil
var opponentTime = 0;
var playerClock;
var opponentClock;

function incrementClock(){
    if(yourTurn)
    {
        let minutes = (playerTime < 100000) ? "0" + Math.floor(playerTime/10000) : Math.floor(playerTime/10000);
        let seconds = (playerTime < 1000) ? "0" + Math.floor((playerTime%10000)/100) : Math.floor((playerTime%10000)/100);
        let milli = playerTime%100;
    
        let temp = minutes + ":" + seconds + "." + milli;

        playerClock.innerHTML = temp;
        playerTime++
    }
    else
    {
        let minutes = (opponentTime < 100000) ? "0" + Math.floor(opponentTime/10000) : Math.floor(opponentTime/10000);
        let seconds = (opponentTime < 1000) ? "0" + Math.floor((opponentTime%10000)/100) : Math.floor((opponentTime%10000)/100);
        let milli = opponentTime%100;
    
        let temp = minutes + ":" + seconds + "." + milli;

        opponentClock.innerHTML = temp;
        opponentTime++;
    }

    setTimeout(incrementClock, 10);
}

function clockHandler()
{
    playerClock = document.getElementById("playerClock");
    opponentClock = document.getElementById("opponementClock");
    incrementClock();
}