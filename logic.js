let playerXName = '';
let playerOName = '';
let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let scores = {
    'X': 0,
    'O': 0
};

function move(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById(`cell-${row}-${col}`).innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            let winnerName = currentPlayer === 'X' ? playerXName : playerOName;
            alert(`${winnerName} wins!`);
            scores[currentPlayer]++;
            updateScores();
            disable();
        } else if (checkDraw()) {
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true; // Rows
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true; // Columns
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true; // Diagonal 1
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true; // Diagonal 2
    return false;
}

function checkDraw() {
    for (let row of board) for (let cell of row) if (cell === '') return false;
    return true;
}

function reset() {
    currentPlayer = 'X';
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    document.getElementById('result').innerText = '';
    enable();
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) document.getElementById(`cell-${i}-${j}`).innerText = '';
}

function disable() {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) document.getElementById(`cell-${i}-${j}`).removeAttribute('onclick');
}

function enable() {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) document.getElementById(`cell-${i}-${j}`).setAttribute('onclick', `move(${i}, ${j})`);
}

function updateScores() {
    document.getElementById('scores').innerHTML = `
<h4>${playerXName}: ${scores['X']}</h4>
<h4>${playerOName}: ${scores['O']}</h4>
`;
}

window.onload = function () {
    let validXName = false;
    let validOName = false;

    while (!validXName) {
        playerXName = prompt("Enter name for Player X:");
        if (playerXName && playerXName.trim().length >= 3) {
            validXName = true;
        } else {
            alert("Player X name must be at least 3 characters long.");
        }
    }

    while (!validOName) {
        playerOName = prompt("Enter name for Player O:");
        if (playerOName && playerOName.trim().length >= 3) {
            validOName = true;
        } else {
            alert("Player O name must be at least 3 characters long.");
        }
    }

    updateScores();
};
