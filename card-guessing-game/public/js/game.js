// public/js/game.js
const cards = Array.from({ length: 18 }, (_, i) => i + 1).flatMap(i => [i, i]);
let shuffledCards = shuffle(cards);
let selectedCards = [];
let matchedCards = 0;

const gameBoard = document.getElementById('game-board');
const winningMessage = document.getElementById('winning-message');

// Create the game grid
function setupGame() {
  gameBoard.innerHTML = '';
  shuffledCards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Shuffle the cards array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip a card
function flipCard() {
  const card = this;
  if (selectedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if selected cards match
function checkMatch() {
  const [first, second] = selectedCards;
  if (first.dataset.value === second.dataset.value) {
    matchedCards += 2;
    selectedCards = [];
    if (matchedCards === shuffledCards.length) {
      winningMessage.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      first.classList.remove('flipped');
      first.textContent = '';
      second.classList.remove('flipped');
      second.textContent = '';
      selectedCards = [];
    }, 1000);
  }
}

// Reset the game
function resetGame() {
  shuffledCards = shuffle(cards);
  selectedCards = [];
  matchedCards = 0;
  winningMessage.classList.add('hidden');
  setupGame();
}

setupGame();
