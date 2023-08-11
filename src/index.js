import './styles.css';

const refreshButton = document.getElementById('refreshButton');
const addButton = document.getElementById('addButton');
const scoreboard = document.getElementById('scoreboard');
const nameInput = document.getElementById('nameInput');
const scoreInput = document.getElementById('scoreInput');

// Load scores from local storage or initialize if not found
const scores = JSON.parse(localStorage.getItem('scores')) || [
  { name: 'Alice', score: 100 },
  { name: 'Bob', score: 85 },
  { name: 'Carol', score: 120 },
];

function refreshScoreboard() {
  scoreboard.innerHTML = '';
  scores.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.innerHTML = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreboard.appendChild(entryDiv);
  });
}

function addScore() {
  const name = nameInput.value;
  const score = parseInt(scoreInput.value, 10);
  if (name && !Number.isNaN(score)) {
    scores.push({ name, score });

    // Save scores to local storage
    localStorage.setItem('scores', JSON.stringify(scores));

    nameInput.value = '';
    scoreInput.value = '';
    refreshScoreboard();
  }
}
refreshButton.addEventListener('click', refreshScoreboard);
addButton.addEventListener('click', addScore);
// Initial call to populate the scoreboard on page load
refreshScoreboard();
