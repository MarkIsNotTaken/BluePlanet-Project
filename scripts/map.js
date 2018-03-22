xCoord = () => {
  return Math.floor(Math.random() * $("#map").height() - 20)
}

yCoord = () => {
  return Math.floor(Math.random() * $("#map").width() - 120)
}

let images = ["styles/redbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg"];

let randomImg = () => {
  return (Math.floor(Math.random() * images.length) + 0)
};

let addBarGood = () => {
  $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
};

let addBarBad = () => {
  $('#renewableProgress').css('height', $('#renewableProgress').height() + 15)
  $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 15);
};

dictateBar = () => {
  event.target.style.opacity = 0;
  event.target.onclick = null;
  if (event.target.getAttribute("src") !== images[0]) {
    addBarGood()
  } else {
    addBarBad()
  }
}

let timeNum = () => {
  return (Math.floor(Math.random() * 8) + 4)
}

var timePassed = [];

let randomButton = () => {
  let randX = xCoord();
  let randY = yCoord();
  let randNum = randomImg();
  let randTime = timeNum();
  let remaining = document.getElementById('map').children;
  let currBubble = $(`#` + `${remaining.length - 1}`)[0];
  $('#map').append($(`<img class="bubble" id="${remaining.length}" onclick="dictateBar()" src="${images[randNum]}" style="top:` + randX + `px; left:` + randY + `px;" >`));
  timePassed.push(parseInt(currBubble.id));
  console.log(timePassed);
  for (var i = 0; i < timePassed.length; i++){
    timePassed[i]++
    if (timePassed[i] >= parseInt(remaining[i].id) + randTime){
      $("#" + i)[0].style.opacity = 0;
      $("#" + i)[0].onclick = null;
    }
  }
}

let bubbleGenerate;
let timer;
let gameStart = 0;
let gameActive = 0;
let background = document.getElementById('background');
let startButton = document.getElementById('startButton');
let pauseButton = document.getElementById('pauseButton');
let resumeButton = document.getElementById('resumeButton');
let settings = document.getElementById('settingsButton');
let settingsMenu = document.getElementById('settingsMenu');
let information = document.getElementById('informationButton');
let bubble = document.getElementsByClassName('bubble');
let informationMenu = document.getElementById('informationMenu');
let gamePaused = document.getElementById('gamePaused');
let zoomAnimation = document.getElementById('zoomAnimation');
let notMap = document.getElementById('notMap');
let startZoom = document.getElementById('startZoom');
let beforeStart = document.getElementById('beforeStart');
let gameRestart = document.getElementById('restart');
let timerFail = document.getElementById('timerFail')


zoomAnimation.addEventListener("animationend", AnimationListener, false);

$("#startZoom").click(function() {
  $('#beforeStart').addClass('animated zoomOut');
  $('#zoomAnimation').addClass('addZoom');
  $('#beforeStart').removeClass('animated zoomOut');
  beforeStart.style.display = "none";
});

function AnimationListener(){
  notMap.style.display = "block";
  $('#startButton').addClass('animated infinite rubberBand');
}

startButton.addEventListener("click", function() {
    $('#startButton').removeClass('animated infinite rubberBand');
    bubbleGenerate = setInterval(randomButton, 1000);
    console.log(bubbleGenerate, "bubbleGeneration started");
    timer = setInterval(countdown, 1000);
    console.log(timer, "Timer countdown started")
    console.log('Game Started');
    gameStart = 1;
    gameActive = 1;
    console.log('gameActive is', gameActive)
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    settingsMenu.style.display = "none";
    informationMenu.style.display = "none";

    restart.addEventListener("click", function() {
      timerFail.style.display = "none";
      background.style.filter = "blur(0px)";
      pauseButton.style.display = "none";
      startButton.style.display = "block";
      document.getElementById('timer').innerHTML = "2:00";
    });

    pauseButton.addEventListener("click", function() {
      pause();
      gamePaused.style.display = "block";
    });

    resumeButton.addEventListener("click", function() {
      resume();
      gamePaused.style.display = "none";
    });

    settings.addEventListener("click", function() {
      pause();
    });

    information.addEventListener("click", function() {
      pause();
      gamePaused.style.display = "none";
    });

  let pause = () => {
    clearInterval(bubbleGenerate);
    clearInterval(timer);
    gameActive = 0;
    background.style.filter = "blur(60px)";
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
  };

  let resume = () => {
    bubbleGenerate = setInterval(randomButton, 1000);
    gameActive = 1;
    background.style.filter = "blur(0px)";
    settingsMenu.style.display = "none";
    informationMenu.style.display = "none";
    resumeButton.style.display = "none";
    pauseButton.style.display = "block";
    timer = setInterval(countdown, 1000);
  };

    $('.menuClose').click(function() {
      if(gameStart == 1){
        bubbleGenerate = setInterval(randomButton, 1000);
        timer = setInterval(countdown, 1000);
        console.log('Menu Closed, Starting Generating');
        pauseButton.style.display = "block";
        resumeButton.style.display = "none";
        gameActive = 1;
      };
    });
});

settings.addEventListener("click", function() {
    settingsMenu.style.display = "block";

    if(informationMenu.style.display == "block"){
      informationMenu.style.display = "none";
    }
});

information.addEventListener("click", function() {
    informationMenu.style.display = "block";

    if(settingsMenu.style.display == "block"){
      settingsMenu.style.display = "none";
    }
});

$('.menuClose').click(function() {
    background.style.filter = "blur(0px)";
    informationMenu.style.display = "none";
    settingsMenu.style.display = "none";
});
