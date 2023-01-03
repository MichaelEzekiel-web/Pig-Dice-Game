'use strict';

const player0_Element = document.querySelector('.player--0');
const player1_Element = document.querySelector('.player--1');

// Selecting Elements
const score0_Element = document.querySelector('#score--0');
const score1_Element = document.querySelector('#score--1');
const dice_Element = document.querySelector('.dice');

// Scores
const current0_Element = document.querySelector('#current--0');
const current1_Element = document.querySelector('#current--1');

// Buttons
const btn_New = document.querySelector('.btn--new');
const btn_Roll = document.querySelector('.btn--roll');
const btn_Hold = document.querySelector('.btn--hold');

// const confirm = document.querySelector('.confirm');
// confirm.classList.add('hidden');

let scores, current_Score, active_Player, playing;

const init = function () {
  scores = [0, 0];
  current_Score = 0;
  active_Player = 0;

  playing = true;

  // Remove scores
  score0_Element.textContent = 0;
  score1_Element.textContent = 0;
  dice_Element.classList.add('hidden');

  // Current scores
  current0_Element.textContent = 0;
  current1_Element.textContent = 0;

  player0_Element.classList.remove('player--winner');
  player1_Element.classList.remove('player--winner');

  player0_Element.classList.add('player--active');
  player1_Element.classList.remove('player--active');
};

// Calling initialization function
init();

// Switching Player
const switchPlayer = function () {
  document.getElementById(`current--${active_Player}`).textContent = 0;
  current_Score = 0;
  active_Player = active_Player === 0 ? 1 : 0;

  player0_Element.classList.toggle('player--active');
  player1_Element.classList.toggle('player--active');
};

// Rolling Dice

btn_Roll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice(Remove hidden class)
    dice_Element.classList.remove('hidden');

    // Manipulating images (changing) from javascript
    dice_Element.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add dice to current score
      current_Score = current_Score + dice;

      // Selecting the player element
      document.getElementById(`current--${active_Player}`).textContent =
        current_Score;
    } else {
      switchPlayer();
    }
  }
  console.log('dice is out');
  player1_Element.classList.add('diceout');
});

btn_Hold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player score
    scores[active_Player] = scores[active_Player] + current_Score;

    document.querySelector(`#score--${active_Player}`).textContent =
      scores[active_Player];

    // Check if player's score is up to 100
    if (scores[active_Player] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${active_Player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_Player}`)
        .classList.remove('player--active');

      // Hide dice
      dice_Element.classList.add('hidden');
    } else {
      //Switch Player
      switchPlayer();
    }
  }
});

// Reset the game
btn_New.addEventListener('click', init);
