let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lose: 0,
  ties: 0,
};

const jsResult = document.querySelector(".js-result");
const jsMoves = document.querySelector(".js-moves");
const jsScore = document.querySelector(".js-score");

const jsRock = document.querySelector(".js-rock-button");
const jsPaper = document.querySelector(".js-paper-button");
const jsScissors = document.querySelector(".js-scissors-button");

const jsReset = document.querySelector(".js-reset-button");
const jsAuto = document.querySelector(".js-auto-button");

jsScore.textContent = `Wins: ${score.wins}   Losses: ${score.lose}   Ties: ${score.ties}`;

function updateScoreElement() {
  jsScore.innerHTML = `Wins: ${score.wins} &nbsp;&nbsp; Losses: ${score.lose}  &nbsp;&nbsp;  Ties: ${score.ties}`;
}

function removeResult() {
  jsMoves.textContent = "Score has been reset.";
  jsResult.textContent = "";
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result;

  if (playerMove === computerMove) {
    result = "Tie";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You Win";
    score.wins += 1;
  } else {
    result = "You Lose";
    score.lose += 1;
  }

  score.ties = score.wins + score.lose;

  updateScoreElement();

  jsResult.innerHTML = result;

  jsMoves.innerHTML = ` You <img src="Rock Paper Img/${playerMove}.png" alt="${playerMove}" />
      <img src="Rock Paper Img/${computerMove}.png" alt="${computerMove}" />
      Computer`;

  localStorage.setItem("score", JSON.stringify(score));
}

function resetScore() {
  score = { wins: 0, lose: 0, ties: 0 };
  localStorage.removeItem("score");
  removeResult();
  updateScoreElement();
  alert("Score has been reset");
}

function toggleAutoPlay() {
  if (isAutoPlaying) {
    clearInterval(intervalID);
  } else {
    intervalID = setInterval(() => {
      const randomNumber = Math.random();
      const playerMove =
        randomNumber < 1 / 3
          ? "rock"
          : randomNumber < 2 / 3
          ? "paper"
          : "scissors";
      playGame(playerMove);
    }, 1000);
  }

  isAutoPlaying = !isAutoPlaying;
}

jsRock.addEventListener("click", () => {
  playGame("rock");
  clearAuto();
});

jsPaper.addEventListener("click", () => {
  playGame("paper");
  clearAuto();
});

jsScissors.addEventListener("click", () => {
  playGame("scissors");
  clearAuto();
});

jsReset.addEventListener("click", resetScore);

jsAuto.addEventListener("click", toggleAutoPlay);
