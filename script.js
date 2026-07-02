//game state

let secretNumber = Math.floor(Math.random() * 100) + 1;
let gamePrevGuessList = [];
let gameGuessRemaining = 10;
let gameOver = false;

const form = document.querySelector("form");
const guessInput = document.querySelector("#guessInput");
const feedbackPrevGuess = document.querySelector(".prevGuess");
const feedbackGuessRemaining = document.querySelector(".guessRem");
const feedbackGeneric = document.querySelector(".guessFeedback");
const details = document.querySelector(".details");
const submitButton = document.querySelector(".btn");

form.addEventListener("submit", handleGuess);
guessInput.focus();
function handleGuess(e) {
  e.preventDefault();
  if(gameOver)return;
  const userGuess = Number(guessInput.value);
  if (!validateGuess(userGuess)) return;
  else {
    displayGuess(userGuess);
    checkGuess(userGuess);
  }
}
function validateGuess(userGuess) {
  if (isNaN(userGuess)) {
    feedbackGeneric.textContent = "Please enter a valid number!";
    guessInput.focus();
    return false;
  } else if (userGuess < 1 || userGuess > 100) {
    feedbackGeneric.textContent = "please enter a numebr betwee 1 and 100!";
    guessInput.focus();
    return false;
  }
  return true;
}
function saveGuess(userGuess) {
  gamePrevGuessList.push(userGuess);
  gameGuessRemaining--;
}
function updateUI() {
  feedbackPrevGuess.textContent = gamePrevGuessList.join(",");
  feedbackGuessRemaining.textContent = gameGuessRemaining;
}
function resetInput() {
  guessInput.value = "";
  guessInput.focus();
}
function displayGuess(userGuess) {
  saveGuess(userGuess);
  updateUI();
  resetInput();
  
}
function checkGuess(userGuess) {
  if (userGuess === secretNumber) {
    feedbackGeneric.textContent = "🎉 Congratulations! You guessed correctly.";
    endGame();
  } else if (gameGuessRemaining == 0) {
    feedbackGeneric.textContent = `Game Over! The number was ${secretNumber}.`;
    endGame();
  } else if (userGuess > secretNumber) {
    feedbackGeneric.textContent = "📈 Too High!";
  } else {
    feedbackGeneric.textContent = "📉 Too Low!";
  }
}
const newGameButton = document.createElement("button");
newGameButton.classList.add("btn");
newGameButton.textContent = "Play Again";
newGameButton.style.display="none";
newGameButton.addEventListener("click",newGame)
details.append(newGameButton)
function endGame() {
  guessInput.disabled = true;
  submitButton.disabled = true;
  newGameButton.style.display="block";
  gameOver=true;
 
}

function newGame() {
  gameOver=false;
  newGameButton.style.display="none";
  secretNumber = Math.floor(Math.random() * 100) + 1;
  gamePrevGuessList= [];
  gameGuessRemaining = 10;
  feedbackPrevGuess.textContent = "";
  feedbackGuessRemaining.textContent = "10";
  feedbackGeneric.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  submitButton.disabled = false;
  resetInput();
}
