
let sec = 90;

let gameWin = () => {
    renewableProgress.style.height = "0px";
    nonRenewableProgress.style.height = "0px";
    levelSuccess.style.display = "flex";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";
    $('#youPassed').text("CONGRATULATIONS, YOU BEAT LEVEL " + level);
    level++
    round.innerHTML = "Level " + level;
    levelContinue.innerHTML = "CONTINUE TO LEVEL " + level;
};

let gameFail = () => {
    renewableProgress.style.height = "0px";
    nonRenewableProgress.style.height = "0px";
    timerFail.style.display = "block";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";
};

let countdown = () =>  {
  if (sec === 0) {
    gameActive = 0;
    clearInterval(bubbleGenerate);
    clearInterval(timer);
    gameStart = 0;
    $("#map").remove();
    gameFail();
    console.log('Timer Ran out');
  } else if (sec === 0) {
    sec = 59;
    document.getElementById('timer').innerHTML = sec;
  } else if (sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = sec;
  } else if (sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = sec;
  } else {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = sec;
  }
  checkGame();
};

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
