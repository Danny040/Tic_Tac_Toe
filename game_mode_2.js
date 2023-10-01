const gameMoves = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = ["012", "345", "678", "036", "258", "048", "246", "147"];
const turnTxt = document.getElementById("turn");
let turn = "x";
const gameSquares = document.querySelectorAll(".game-square");
let x = 'Player 1';
let o = 'Player 2';

export function humanGame(playersMarks) {
    if(playersMarks.get("playerOne") == 'o') {
        x = 'Player 2';
        o = 'Player 1';
        document.getElementById("player-1-mark").innerHTML = "o";
        document.getElementById("player-2-mark").innerHTML = "x";
        document.getElementById("player_1").classList.remove("player-x");
        document.getElementById("player_1").classList.add("player-o");
        document.getElementById("player_2").classList.remove("player-o")
        document.getElementById("player_2").classList.add("player-x");
    }

    gameSquares.forEach((square) => {
        square.addEventListener("click",() =>{
            updateSquare(square, square.value);
        });
    });
}

function updateSquare(square, value) {
    if (gameMoves[value] !== "") {
        alert("This is taken.");
        return;
    }
    gameMoves[value] = turn;
    square.innerHTML = turn;
    square.classList.add(`${turn}-move`);
    if ( turn === "x") {
        turn = "o";
    }
    else {
        turn = "x";
    }
    turnTxt.innerHTML = turn;
    checkGameOutcome();
}

function checkGameOutcome() {
    for(let combination of winningCombinations) {
        if(gameMoves[combination[0]] === gameMoves[combination[1]] && gameMoves[combination[0]] === gameMoves[combination[2]] && gameMoves[combination[0]] != "") {
            if(gameMoves[Number(combination[0])] === "x") {
                showWhoWon(1, combination); // x won
                return;
            }
            showWhoWon(2, combination); // o won
            return;
        }
    }
    for(let i = 0; i < 9; i++) {
        if(gameMoves[i] === "") return;
    }
    showWhoWon(3, "000");
}

function showWhoWon(result, squaresNumber) {
    let numberOfButtons = gameSquares.length;
    if(result === 1) {
        for (let i = 0; i < numberOfButtons; i++) {
            if(squaresNumber.includes(gameSquares[i].value)) {
                gameSquares[i].classList.add("winner-x");
            }
        }
        document.getElementById("popup-window").style.display = "flex";
        document.getElementById("winner-mark").innerHTML = 'X';
        document.getElementById("the-winner").innerHTML = x;
    }
    else if (result === 2) {
        for (let i = 0; i < numberOfButtons; i++) {
            if(squaresNumber.includes(gameSquares[i].value)) {
                gameSquares[i].classList.add("winner-o");
            }
        }
        document.getElementById("popup-window").style.display = "flex";
        document.getElementById("winner-mark").innerHTML = 'O';
        document.getElementById("the-winner").innerHTML = o;
    }
    else if (result === 3) {
        document.getElementById("winner-mark").innerHTML = "No one";
        document.getElementById("the-winner").innerHTML = "tie";
        document.getElementById("popup-window").style.display = "flex";
    }
}