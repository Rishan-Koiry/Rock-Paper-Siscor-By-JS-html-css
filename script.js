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
    gameOver = true;
    setTimeout(() => showGameEndModal(true), 1500); // Show modal after notification
  } else if (computerScore >= winningScore) {
    resultDiv.textContent = "Sorry! The computer won the game! 😞";
    showNotif("Computer wins this time!");
    gameOver = true;
    setTimeout(() => showGameEndModal(false), 1500); // Show modal after notification
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
  tiesScoreSpan.textContent = "0";
}

// Game End Modal Functions
function showGameEndModal(playerWon) {
  const modal = document.getElementById("gameEndModal");
  const modalWinner = document.getElementById("modalWinner");
  const finalPlayerScore = document.getElementById("finalPlayerScore");
  const finalComputerScore = document.getElementById("finalComputerScore");
  const finalTiesScore = document.getElementById("finalTiesScore");
  const gameStats = document.getElementById("gameStats");

  // Set winner text and emoji
  if (playerWon) {
    modalWinner.innerHTML = "🎉 You Win! 🏆";
    modalWinner.style.color = "#00ff88";
  } else {
    modalWinner.innerHTML = "😞 Computer Wins! 🤖";
    modalWinner.style.color = "#ff6b6b";
  }

  // Set final scores
  finalPlayerScore.textContent = playerScore;
  finalComputerScore.textContent = computerScore;
  finalTiesScore.textContent = tiesScoreSpan.textContent;

  // Set game stats (simplified)
  const playerName = playerNameInput.value || "Player";

  gameStats.innerHTML = `
    🎮 Game completed by ${playerName}
  `;

  // Show modal
  modal.classList.add("show");

  // Disable game buttons
  rockButton.disabled = true;
  paperButton.disabled = true;
  scissorsButton.disabled = true;
}

function closeGameEndModal() {
  const modal = document.getElementById("gameEndModal");
  modal.classList.remove("show");
}

function downloadResults() {
  const playerName = playerNameInput.value || "Player";
  const winner = playerScore > computerScore ? playerName : "Computer";

  const gameData = `
🎮 ROCK PAPER SCISSORS - GAME RESULTS
=====================================
👤 Player: ${playerName}
📅 Date: ${new Date().toLocaleDateString()}
🕒 Time: ${new Date().toLocaleTimeString()}

📊 FINAL SCORES:
🏆 ${playerName}: ${playerScore}
🤖 Computer: ${computerScore}
🤝 Ties: ${tiesScoreSpan.textContent}

🎯 WINNER: ${winner}

Thanks for playing!
Game created by Rishan Koiry 🚀
🌐 Portfolio: https://rishankoiry.vercel.app/
=====================================
  `.trim();

  // Create and download file
  const blob = new Blob([gameData], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RPS_GameResults_${playerName}_${
    new Date().toISOString().split("T")[0]
  }.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  showNotif("📊 Results downloaded successfully!");
}

function shareResults() {
  const playerName = playerNameInput.value || "Player";
  const winner = playerScore > computerScore ? playerName : "Computer";

  const shareText = `🎮 Just played Rock Paper Scissors!
🏆 Winner: ${winner}
📊 Final Score: ${playerName} ${playerScore} - ${computerScore} Computer
🤝 Ties: ${tiesScoreSpan.textContent}

Play the game: https://github.com/Rishan-Koiry/Rock-Paper-Siscor-By-JS-html-css
Created by Rishan Koiry 🚀`;

  // Try to use Web Share API if available
  if (navigator.share) {
    navigator
      .share({
        title: "Rock Paper Scissors - Game Results",
        text: shareText,
        url: "https://github.com/Rishan-Koiry/Rock-Paper-Siscor-By-JS-html-css",
      })
      .then(() => {
        showNotif("📤 Results shared successfully!");
      })
      .catch(() => {
        fallbackShare(shareText);
      });
  } else {
    fallbackShare(shareText);
  }
}

function fallbackShare(text) {
  // Fallback: copy to clipboard
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotif("📋 Results copied to clipboard!");
      })
      .catch(() => {
        showShareOptions(text);
      });
  } else {
    showShareOptions(text);
  }
}

function showShareOptions(text) {
  // Create temporary textarea for copying
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showNotif("📋 Results copied to clipboard!");
  } catch (err) {
    showNotif("❌ Unable to copy. Please share manually.");
  }

  document.body.removeChild(textarea);
}

function playAgain() {
  closeGameEndModal();
  resetGame();
  showNotif("🎮 New game started! Enter your name to begin.");
}

// Close modal when clicking outside
document.getElementById("gameEndModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeGameEndModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeGameEndModal();
  }
});
