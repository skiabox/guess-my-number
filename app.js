/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Utility functions
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Game values

/**
 * Minimum number to guess.
 *
 * @type {number}
 */
const min = 1;

const max = 10;
const winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');

/**
 * @type {HTMLElement}
 */
const minNum = document.querySelector('.min-num');

const maxNum = document.querySelector('.max-num');

/**
 * @type {HTMLButtonElement}
 */
const guessBtn = document.querySelector('#guess-btn');

/**
 * @type {HTMLInputElement}
 */
const guessInput = document.querySelector('#guess-input');

/**
 * @type {HTMLElement}
 */
const message = document.querySelector('.message');

// Play again event listener
// We delegate the click event of the changed button (with a new added class) to a parent element
// This is common practice for page elements that are different from the first page load status

game.addEventListener('mousedown', e => {
  if (/** @type {HTMLButtonElement} */ (e.target).className === 'play-again') {
    window.location.reload();
  }
});

// Assign UI min and max
minNum.textContent = min.toString();
maxNum.textContent = max.toString();

// functions

/**
 * setMessage: sets a message with a specific color.
 *
 * @function
 * @param {string} msg - The message (could be even a template string).
 * @param {string} color - The color of the message passed as a classic string.
 */
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
};

/**
 * gameOver : function that handles the game over
 *
 * @function
 * @param {boolean} won - Boolean that is true if the player won and false in all other cases
 * @param {string} msg - Sets the message and the color of the message (green if player won and red in all other cases)
 */
const gameOver = (won, msg) => {
  const color = won === true ? 'green' : 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
};

// Listen for guess
guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value); // parseInt of nothing returns a NaN

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      // Disable input
      guessInput.disabled = true;
      // Change border color
      guessInput.style.borderColor = 'red';
      // Set message
      setMessage(
        `Game Over, you lost. The correct number was ${winningNum}`,
        'red'
      );
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});
