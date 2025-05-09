// ======= CONSTANTS & DOM SELECTIONS ======= //

// Start button //
const elements = {
  startContainer: document.querySelector('.start'),
  startTitle: document.querySelector('.title'),
  startButton: document.querySelector('.btn__reset'),
  // Qwerty keyboard //
  keyboard: document.querySelector('#qwerty'),
  // Function to add the phrase to the page //
  addPhraseToPage: document.querySelector('#phrase ul'),
  // Number of lives the user has to guess //
  lives: document.querySelectorAll('#scoreboard img')
};

const phrases = [
  "Hello",
  "Over there",
  "Welcome",
  "I like coding",
  "HaHaHa",
  "Random Phrase"
];

// Number of lives the user has to guess //

const MAX_MISSES = 5;
let missed = 0;


// ======= EVENT LISTENERS ======= //

// Start button //
elements.startButton.addEventListener('click', () => {
  elements.startContainer.style.display = 'none';
  resetGame();
});

// Qwerty keyboard //
elements.keyboard.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    const key = e.target;

    if (key.classList.contains('chosen')) return; // Filters out clicks on already clicked buttons //

    key.classList.add('chosen');
    checkLetter(key.textContent, key);
    checkWin();
  }
});


// ======= FUNCTIONS ======= //

// Function to get a random phrase from the array //
function getRandomPhraseAsArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to add the phrase to the page //
function addPhraseToDisplay(phrase) {
  elements.addPhraseToPage.innerHTML = '';
  phrase.split('').forEach(char => {
    const newLi = document.createElement('li');
    newLi.textContent = char;

    // This adds a space on the page if there is a space in the phrase //
    newLi.classList.add(char === ' ' ? 'space' : 'letter');
    elements.addPhraseToPage.appendChild(newLi);
  });
}

// Function that checks each letter in the phrase //
function checkLetter(letter, key) {
  const checkLis = elements.addPhraseToPage.children;
  let letterFound = null;

  Array.from(checkLis).forEach(li => {
    const check = li.textContent;
    if (check.toLowerCase() === letter.toLowerCase()) {
      li.classList.add('show');
      console.log(letter); // This is here just to see if the code works by logging the selected letter to the console for testing purposes //
      letterFound = li.textContent;
    }
  });

  if (!letterFound) {
    key.classList.add('chosen_miss');
    if (missed < elements.lives.length) {
      elements.lives[elements.lives.length - 1 - missed].src = "images/lostHeart.png";
    }
    missed++; // Adds to missed counter //
    console.log("Missed guesses:", missed);
  }

  return letterFound;
}

// Reset game function for when the user wins or loses //
function checkWin() {
  const storeLetter = document.querySelectorAll('ul .letter');
  const storeShow = document.querySelectorAll('ul .show');

  if (storeLetter.length === storeShow.length) {
    elements.startContainer.classList.add('win');
    displayEndGame('Well Done You win!.', 'Play Again', 'win');
    console.log('Well done'); //currently here for testing purposes //
  } else if (missed >= MAX_MISSES) {
    elements.startContainer.classList.add('lose');
    displayEndGame('Game Over.', 'Try Again', 'lose');
    console.log('Game over'); //currently here for testing purposes //
  }
}

// Reset game function for when the user wins or loses //
function resetGame() {
  missed = 0;
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  resetKeyboardAndLives();
  elements.startContainer.classList.remove('lose', 'win');
}

// Function to display win/lose message //
function displayEndGame(message, buttonText, resultClass) {
  elements.startContainer.classList.add(resultClass);
  elements.startContainer.style.display = 'flex';
  elements.startTitle.textContent = message;
  elements.startButton.textContent = buttonText;
}

// Function to reset keyboard and lives //
function resetKeyboardAndLives() {
  document.querySelectorAll('#qwerty button').forEach(key => {
    key.classList.remove('chosen', 'chosen_miss');
  });
  elements.lives.forEach(life => {
    life.src = "images/liveHeart.png";
  });
}
