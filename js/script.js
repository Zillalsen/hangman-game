const modal = document.querySelector(".modal");
const images = document.querySelector(".hangman-images img");
const keyboard = document.querySelector(".alphabet");
const theHint = document.querySelector(".hint");
const guessedText = document.querySelector(".guessed-text");
const wordContainer = document.querySelector(".word");
const incorecct = document.querySelector(".guessed-text b");
const playAgain = modal.querySelector("button");

let currentWord,
  correctLetters = [];
wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  images.src = `/images/hangman-${wrongGuessCount}.svg`;
  incorecct.innerText = `${wrongGuessCount}/${maxGuesses}`;
  wordContainer.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  modal.classList.remove("open");
  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  theHint.textContent = `Hint: ${hint}`;
  currentWord = word;
  resetGame();
  wordContainer.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `you found the word:`
      : `the correct word was:`;
    modal.querySelector("h3").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    modal.querySelector(
      "p"
    ).innerHTML = `${modalText} <span>${currentWord}</span>`;
    modal.querySelector("img").src = `/images/${
      isVictory ? `victory` : `lost`
    }.gif`;
    modal.classList.add("open");
  }, 300);
};

const initGame = (button, letterClicked) => {
  if (currentWord.includes(letterClicked.toLowerCase())) {
    [...currentWord].forEach((letter, index) => {
      if (letter === letterClicked.toLowerCase()) {
        correctLetters.push(letter);
        wordContainer.querySelectorAll("li")[index].innerText = letter;
        wordContainer.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    images.src = `/images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  incorecct.innerText = `${wrongGuessCount}/${maxGuesses}`;
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgain.addEventListener("click", getRandomWord);
