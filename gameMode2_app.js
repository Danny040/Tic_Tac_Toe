const gameMoves = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = ["012", "345", "678", "036", "258", "048", "246", "147"];
const turnTxt = document.getElementById("turn");
let turn = "x";
const gameSquares = document.querySelectorAll(".game-square");
let x = 'Player 1';
let o = 'Player 2';
const gameResults = [0, 0, 0]; // x, tie, o

export function humanGame(playersMarks) {
    console.log("inside human game: ");
    if(playersMarks.get("playerOne") == 'o') {
        document.getElementById("player1").innerHTML = "(Player 2)";
        document.getElementById("player2").innerHTML = "(Player 1)";
        x = 'Player 2';
        o = 'Player 1';
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
}

function showWhoWon(result, squaresNumber) {
    let numberOfButtons = gameSquares.length;
    if(result === 1) {
        for (let i = 0; i < numberOfButtons; i++) {
            if(squaresNumber.includes(gameSquares[i].value)) {
                gameSquares[i].classList.add("winner-x");
            }
        }
        gameResults[0] += 1;
        document.getElementById("popup-window").style.display = "flex";
        document.getElementById("winner-mark").innerHTML = 'X';
        document.getElementById("the-winner").innerHTML = x;
        document.getElementById("won-number").innerHTML = gameResults[0];
        // document.getElementById("next-round").addEventListener("click",() => {
        //     location.reload();
        //     start();
        // });
    }
    else if (result === 2) {
        for (let i = 0; i < numberOfButtons; i++) {
            if(squaresNumber.includes(gameSquares[i].value)) {
                gameSquares[i].classList.add("winner-o");
            }
        }
        gameResults[2] += 1;
        document.getElementById("popup-window").style.display = "flex";
        document.getElementById("winner-mark").innerHTML = 'O';
        document.getElementById("the-winner").innerHTML = o;
        document.getElementById("lost-number").innerHTML = gameResults[2];
    }
}