const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startGame');
const difficultySelect = document.getElementById('difficulty');

const winModal = document.getElementById('winModal');
const closeModal = document.getElementsByClassName('close')[0];

let flippedCards = [];
let matchedCards = [];
let cards;
let pairCount;

const cardSymbols = ['😀', '😎', '😇', '😜', '🤩', '🥳', '😈', '👻', '🤡', '🤖'];

/* Game Logic */
function startGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            pairCount = 4;
            break;
        case 'medium':
            pairCount = 6;
            break;
        case 'hard':
            pairCount = 8;
            break;
    }

    const selectedSymbols = cardSymbols.slice(0, pairCount);
    const cardValues = [...selectedSymbols, ...selectedSymbols].sort(() => 0.5 - Math.random());

    gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(pairCount * 2)}, 100px)`;
    cardValues.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    cards = document.querySelectorAll('.card');
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchedCards.push(firstCard, secondCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        if (matchedCards.length === cards.length) {
            showWinModal();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function showWinModal() {
    winModal.style.display = 'block';
}

/* Modal Logic */
closeModal.onclick = () => {
    winModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === winModal) {
        winModal.style.display = 'none';
    }
};

/* Start Game Event */
startButton.addEventListener('click', startGame);
