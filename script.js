'use strict';
// import dice1 from './img/dice-1.png';
// import dice2 from './img/dice-2.png';
// import dice3 from './img/dice-3.png';
// import dice4 from './img/dice-4.png';
// import dice5 from './img/dice-5.png';
// import dice6 from './img/dice-6.png';

// import * as images from 'url:./img';
// import {dice-1.png}  from './img/';
//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentscore0 = document.getElementById('current--0');
const currentscore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let active, score, currentscore, playing;

const initiate = function () {
  //starting conditions
  score = [0, 0];
  active = 0;
  currentscore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;

  dice.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};
initiate();

//switching function
const switchPlayer = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  active = active === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//adding event in roll button
rollBtn.addEventListener('click', function () {
  if (playing) {
    //display the dice
    dice.classList.remove('hidden');

    //create a random no.for the dice
    const diceNo = Math.trunc(Math.random() * 6) + 1;

    //manipulating src
    dice.src = `img/dice-${diceNo}.png`;

    //in case of 1 change the player.
    if (diceNo !== 1) {
      //add dice number to current score.
      currentscore += diceNo;
      document.getElementById(`current--${active}`).textContent = currentscore;
    } else switchPlayer();
  }
});

//adding event in hold button
holdBtn.addEventListener('click', function () {
  if (playing) {
    //add currentscore to the totalscore
    score[active] += currentscore;
    document.getElementById(`score--${active}`).textContent = score[active];

    //check if the total score is greater than or equal to hundred
    if (score[active] >= 20) {
      //finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
    }
    //switch the player
    else switchPlayer();
  }
});

//adding event to the new game button
newBtn.addEventListener('click', initiate);
