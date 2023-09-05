// section selecting element
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const name1 = document.getElementById('name--0');
const name2 = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonResetGame = document.querySelector('.btn--new');

let score, currentScore, activePlayer, playing;
//condition awal
const newGame = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  name1.textContent = 'pemain 1';
  name2.textContent = 'pemain 2';

  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  diceEl.classList.add('hidden');
};
newGame();

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
}
//function for putar dadu
buttonRoll.addEventListener('click', rollDice);

function rollDice() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

//function for tahan
buttonHold.addEventListener('click', holdScore);

function holdScore() {
  if (playing) {
    // add curent score to active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check ig score >= 100
    if (score[activePlayer] >= 120) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent =
        'YOU WIN🏆!!!';
      document.getElementById(`score--${activePlayer}`).textContent =
        "'Gege geminkk😁!!'";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
}

// function for reset game
buttonResetGame.addEventListener('click', newGame);
