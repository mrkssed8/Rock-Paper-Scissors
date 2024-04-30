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

const jsMain = document.querySelector(".js-html-main");
const jsReset = document.querySelector(".js-reset-button");
const jsAuto = document.querySelector(".js-auto-button");
const jsResetConfirm = document.querySelector(".js-reset-confirm");

jsScore.innerText = `Wins: ${score.wins}  \xa0\xa0\xa0\xa0Losses: ${score.lose}  \xa0\xa0\xa0\xa0Ties: ${score.ties}`;

function updateScoreElement() {
  jsScore.innerHTML = `Wins: ${score.wins} &nbsp;&nbsp; Losses: ${score.lose}  &nbsp;&nbsp;  Ties: ${score.ties}`;
}

function removeResult() {
  jsMoves.innerText = "Score has been reset.";

  jsResult.innerText = "";
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

jsRock.addEventListener("click", () => {
  computerMove = pickComputerMove();
  playGame("rock");
  clearAuto();
});

jsPaper.addEventListener("click", () => {
  computerMove = pickComputerMove();
  playGame("paper");
  clearAuto();
});

jsScissors.addEventListener("click", () => {
  computerMove = pickComputerMove();
  playGame("scissors");
  clearAuto();
});

jsReset.addEventListener("click", () => {
  resetConfirm();
});

jsAuto.addEventListener("click", () => {
  pickComputerMove();
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    computerMove = pickComputerMove();
    playGame("rock");
    clearAuto();
  }
  if (event.key === "p") {
    computerMove = pickComputerMove();
    playGame("paper");
    clearAuto();
  }
  if (event.key === "s") {
    computerMove = pickComputerMove();
    playGame("scissors");
    clearAuto();
  }
  if (event.key === "a") {
    pickComputerMove();
    autoPlay();
  }
  if (event.key === "Backspace") {
    resetConfirm();
  }

  console.log(event.key);
});

function playGame(playerMove) {
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.lose += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  updateScoreElement();
  {
    jsResult.innerHTML = result;

    jsMoves.innerHTML = ` You <img src="Rock Paper Img/${playerMove}.png" alt="${playerMove}" />
    <img src="Rock Paper Img/${computerMove}.png" alt="${computerMove}" />
    Computer`;
  }

  localStorage.setItem("score", JSON.stringify(score));

  /* alert(
    `You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.wins}  Losses: ${score.lose}  Ties: ${score.ties}`
  );
}
*/
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const randomNumber = Math.random();

      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        playerMove = "rock";
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        playerMove = "paper";
      } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
        playerMove = "scissors";
      }

      playGame(playerMove);
    }, 1000);
    jsAuto.innerText = "Stop Playing";

    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    jsAuto.innerText = "Auto Play";
    isAutoPlaying = false;
  }
}

function clearAuto() {
  clearInterval(intervalID);
  isAutoPlaying = false;
}

function resetConfirm() {
  clearAuto();

  jsResetConfirm.innerHTML = `
 
  <div class="js-confirm-text-div">ARE YOU SURE YOU WANT TO RESET THE SCORE?</div>
  <div class="js-confirm-button-div">
    <button class="confirm-button js-confirm-yes">Yes</button>
    <button class="confirm-button js-confirm-no">No</button>
  </div>
 `;

  jsMain.classList.add("main-toggled");
}

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-confirm-yes")) {
    score.wins = 0;
    score.lose = 0;
    score.ties = 0;
    localStorage.removeItem("score");
    removeResult();
    updateScoreElement();
    alert("Score has been reset");

    jsMain.classList.remove("main-toggled");
    jsResetConfirm.innerHTML = "";
  }

  if (event.target.classList.contains("js-confirm-no")) {
    jsMain.classList.remove("main-toggled");
    jsResetConfirm.innerHTML = "";
  }
});
