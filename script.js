const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const resetButton = document.getElementById("reset");
const playerNameInput = document.getElementById("player-name");
const notif = document.getElementById("notification");
const tiesScoreSpan = document.getElementById("ties-score");
const playerChoiceDiv = document.getElementById("player-choice");
const computerChoiceDiv = document.getElementById("computer-choice");
let playerScore = 0;
let computerScore = 0;

let timeout;
const choices = ["rock", "paper", "scissors"];
const winningScore = 5;
let gameOver = false;
let nameEntered = false;

rockButton.disabled = true;
paperButton.disabled = true;
scissorsButton.disabled = true;

rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));
resetButton.addEventListener("click", resetGame);
document.querySelector("#player-name").addEventListener("change", (e) => {
  const playerLabel = document.querySelectorAll(".score-label")[0];
  const playerLabel2 = document.querySelectorAll(".score-label2")[0];

  if (e.target.value.trim() !== "") {
    playerLabel.textContent = e.target.value;
    playerLabel2.textContent = e.target.value;

    e.target.disabled = true;
    nameEntered = true;
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    resultDiv.textContent = "Make your move!";
  } else {
    playerLabel.textContent = "Player";
  }
});

function gone() {
  timeout = setTimeout(hideResult, 3500);
}
let notifTimeout;

function showNotif(message, duration = 2500) {
  clearTimeout(notifTimeout);
  notif.textContent = message;
  notif.style.transition = "right 0.5s ease";
  notif.style.right = "200px";

  notifTimeout = setTimeout(() => {
    notif.style.right = "-550px";
  }, duration);
}

function hideResult() {
  resultDiv.textContent = "";
}
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
function getEmoji(choice) {
  if (choice === "rock") return "🪨";
  if (choice === "paper") return "📄";
  if (choice === "scissors") return "✂️";
}
function playRound(playerSelection) {
  if (gameOver || !nameEntered) return;
  const computerSelection = getComputerChoice();
  let result = "";
  if (playerSelection === computerSelection) {
    result = "It's a tie! 🤝";
    gone();
    playerChoiceDiv.textContent = ` ${getEmoji(playerSelection)}`;
    computerChoiceDiv.textContent = ` ${getEmoji(computerSelection)}`;
    showNotif("It's a tie!🤝 ");
    tiesScoreSpan.textContent = parseInt(tiesScoreSpan.textContent) + 1;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    result = "You win! 🎉";
    playerChoiceDiv.textContent = `${getEmoji(playerSelection)}`;
    computerChoiceDiv.textContent = `${getEmoji(computerSelection)}`;
    gone();
    showNotif("You won this round!🥳");
  } else {
    computerScore++;
    result = "You lose! 😞";
    playerChoiceDiv.textContent = `${getEmoji(playerSelection)}`;
    computerChoiceDiv.textContent = `${getEmoji(computerSelection)}`;
    showNotif("You lost this round!");
    gone();
  }
  resultDiv.textContent = result;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  checkForWinner();
}
function checkForWinner() {
  if (playerScore >= winningScore) {
    resultDiv.textContent = " You won the game! 🏆";
    showNotif(" You are the champion! 🏆");
    showNotif('Click "Reset Game" to play again.');
    gone();
    gameOver = true;
  } else if (computerScore >= winningScore) {
    resultDiv.textContent = "Sorry! The computer won the game! 😞";

    showNotif("Computer wins this time!");
    showNotif('Click "Reset Game" to play again.');

    gone();
    gameOver = true;
  }
}
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  resultDiv.textContent = "Enter your name to start playing!";
  gameOver = false;
  nameEntered = false;
  playerNameInput.disabled = false;
  playerNameInput.value = "";
  document.querySelectorAll(".score-label")[0].textContent = "Player";
  rockButton.disabled = true;
  paperButton.disabled = true;
  scissorsButton.disabled = true;
  playerChoiceDiv.textContent = "";
  computerChoiceDiv.textContent = "";
}
