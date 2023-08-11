import './styles.css';
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let gameID = '';

const createGame = async () => {
  try {
    const response = await fetch(`${baseURL}/games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'BasketBall', 
      }),
    });
    const data = await response.json();
    gameID = data.result.split(': ')[1];
    console.log('Game created:', gameID);
  } catch (error) {
    console.error('Error creating game:', error);
  }
};

const refreshScoreboard = async () => {
  try {
    const response = await fetch(`${baseURL}/games/${gameID}/scores/`);
    const data = await response.json();
    const scoreboard = document.getElementById('scoreboard');

    const maxLength = data.result.reduce(
      (max, entry) => Math.max(max, entry.user.length),
      0
    );

    scoreboard.innerHTML = data.result
      .map((entry, index) => {
        const evenClass = index % 2 !== 0 ? 'even' : '';
        return `<div class="entry ${evenClass}">
                  <span class="name">${entry.user.padEnd(maxLength, ' ')}</span>
                  <span class="separator">:</span>
                  <span class="score">${entry.score}</span>
                </div>`;
      })
      .join('');
  } catch (error) {
    console.error('Error refreshing scoreboard:', error);
  }
};

const addScore = async () => {
  const nameInput = document.getElementById('nameInput');
  const scoreInput = document.getElementById('scoreInput');
  const name = nameInput.value;
  const score = parseInt(scoreInput.value, 10);
  if (name && !Number.isNaN(score)) {
    try {
      await fetch(`${baseURL}/games/${gameID}/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: name,
          score: score,
        }),
      });
      console.log('Score added:', name, score);
      nameInput.value = '';
      scoreInput.value = '';
      refreshScoreboard();
    } catch (error) {
      console.error('Error adding score:', error);
    }
  }
};

const refreshButton = document.getElementById('refreshButton');
const submitButton = document.getElementById('addButton');

refreshButton.addEventListener('click', refreshScoreboard);
submitButton.addEventListener('click', addScore);

createGame().then(refreshScoreboard);
