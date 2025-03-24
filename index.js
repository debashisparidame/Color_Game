const colorNames = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
];

let winingScore = 3;
let targetColor = " ";
let score = 0;
let timer = 120;
let gameInerval, timerInterval;

let setRandomColor = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const randomColor = colorNames[randomIndex];
    cell.style.backgroundColor = randomColor;
    cell.setAttribute("data-color", randomColor);
  });
};

let setTargetColor = () => {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  targetColor = colorNames[randomIndex];
  document.getElementById("targetColor").textContent = targetColor;
};

let formateTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

let updateTimer = () => {
  timer--;
  document.getElementById("timer").textContent = formateTime(timer);

  if(timer <= 0)
  {
    endGame(false);
  }
};

let initializeGame = () => {
  score = 0;
  timer = 120;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = formateTime(timer);
  document.getElementById("congratsOverlay").style.display = "none";
  document.getElementById("loseOverlay").style.display = "none";
  setRandomColor();
  setTargetColor();

  const bgm = document.getElementById("backgroundMusic");
  bgm.play();

  gameInerval = setInterval(setRandomColor, 1000);
  timerInterval = setInterval(updateTimer, 1000);
};


let endGame = (isWin) => {
  clearInterval(gameInerval);
  clearInterval(timerInterval);
  document.getElementById("backgroundMusic").pause();
  
  const overlay = isWin
    ? document.getElementById("congratsOverlay")
    : document.getElementById("loseOverlay");

  overlay.style.display = 'block';

  if (isWin) {
    document.getElementById('winMusic').play();
  } else {
    document.getElementById('loseMusic').play();
  }
};


let handleClick = (e) => {
  const clickedColor = e.target.getAttribute("data-color");

  if (clickedColor === targetColor) {
    score++;
    document.getElementById("score").textContent = score;

    if (score === winingScore) {
      endGame(true);
      return;
    }
    setRandomColor();
    setTargetColor();
    try {
      document.getElementById("correctMusic").play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  } else {
    try {
      document.getElementById("incorrectMusic").play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }
};

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handleClick);
});


document.getElementById('loseOverlay').addEventListener('click', initializeGame);
document.getElementById('congratsOverlay').addEventListener('click', initializeGame);

initializeGame();

