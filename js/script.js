const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

// How do I check game status?
function checkGameStatus(){
    // Define the winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]

    // Check for a win or lose
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a ,b, c] = winningCombinations[i];
        if (cells[a].innerText && 
            (
                cells[a].innerText === cells[b].innerText && 
                cells[a].innerText === cells[c].innerText
            )
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} Wins!`;
        return
    }

    // Check for tie
    const roundDraw = [...cells].every(cell => cell.innerText !== '');
    if (roundDraw) {
        statusText.innerText = `Draw!`;
        return
    }

    // Switch the player
    if (currentPlayer == 'X') {
        currentPlayer = 'O'
    } else if (currentPlayer == 'O') {
        currentPlayer = 'X'
    }
    statusText.innerText = `${currentPlayer}'s Turn`;
}

// How do handle cell click?
function handleCellClick(event){
    // handle click event from the cell
    const cell = event.target;
    const isCell = cell.classList.contains('cell');

    if (isCell && cell.innerText === '') {
        cell.innerText = currentPlayer;
        cell.classList.add('used')
        checkGameStatus()
    }
}

// How do I restart the game?
function restartGame(){
    // clear the cells
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('used');
    })
    // show status of whose turn is it
    statusText.innerText = `${currentPlayer}'s Turn`
}

// Initialise the game
gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
restartGame();