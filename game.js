const EMOJIS = [
  '🐶', '🐱', '🐸', '🦊', '🐻', '🐼', '🐨', '🦁',
  '🐯', '🐮', '🐷', '🐵', '🦄', '🐙', '🦋', '🐢',
  '🍎', '🍕'
];

const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const newGameBtn = document.getElementById('new-game');
const winOverlay = document.getElementById('win-overlay');
const winMoves = document.getElementById('win-moves');
const winTime = document.getElementById('win-time');
const playAgainBtn = document.getElementById('play-again');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timerInterval = null;
let seconds = 0;
let locked = false;
let timerStarted = false;

const PAIRS = 8;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function createCard(emoji, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;
  card.dataset.emoji = emoji;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back"></div>
      <div class="card-face card-front">${emoji}</div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (locked) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  if (flippedCards.length >= 2) return;

  startTimer();
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = flippedCards;
  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add('matched');
    b.classList.add('matched');
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === PAIRS) {
      stopTimer();
      setTimeout(showWin, 500);
    }
  } else {
    locked = true;
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flippedCards = [];
      locked = false;
    }, 1000);
  }
}

function showWin() {
  winMoves.textContent = moves;
  winTime.textContent = formatTime(seconds);
  winOverlay.classList.remove('hidden');
}

function initGame() {
  stopTimer();
  winOverlay.classList.add('hidden');
  grid.innerHTML = '';
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  locked = false;
  timerStarted = false;
  movesEl.textContent = '0';
  timerEl.textContent = '0:00';

  const chosen = shuffle([...EMOJIS]).slice(0, PAIRS);
  const deck = shuffle([...chosen, ...chosen]);

  deck.forEach((emoji, i) => {
    const card = createCard(emoji, i);
    cards.push(card);
    grid.appendChild(card);
  });
}

newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

initGame();
