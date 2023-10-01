const gameMoves = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = ["012", "345", "678", "036", "258", "048", "246", "147"];
const turnTxt = document.getElementById("turn");
let turn = "x";
const gameSquares = document.querySelectorAll(".game-square");
let x = 'human';
let o = 'cpu';
let flag = 1;

export function cpuGame(playersMarks) {
    const player1 = document.getElementById("player1-name");
    const player2 = document.getElementById("player2-name");
    player2.innerHTML = "cpu";
    player1.innerHTML = "human";
    if(playersMarks.get("playerOne") == 'o') {
        x = 'cpu';
        o = 'human';
        player1.innerHTML = "cpu";
        player2.innerHTML = "human";

    }

    gameSquares.forEach((square) => {
        square.addEventListener("click",() =>{
            updateSquare(square, square.value);
        });
    });

    switchCpuHuman();
}

// bellow function switches between moves of cpu and a human player
function switchCpuHuman() {

    if ((turn === "x" && x === "human" )||(turn === "o" && o === "human")) {
        return;
    }
    setTimeout(cpuMove, 500);
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
    console.log(gameMoves);
    checkGameOutcome();
}

function cpuMove() {
    for(let combination of winningCombinations) {
        if((gameMoves[combination[0]] === gameMoves[combination[1]] &&  gameMoves[combination[2]] === "" && gameMoves[combination[1]] !== "") || (gameMoves[combination[0]] === gameMoves[combination[2]] && gameMoves[combination[1]] === "" && gameMoves[combination[0]] != "") || (gameMoves[combination[1]] === gameMoves[combination[2]] && gameMoves[combination[0]] === "" && gameMoves[combination[2]] != "" )) {
                console.log("combination after long statement: " + combination);
                if (gameMoves[combination[0]] === "") {
                    updateSquare(gameSquares[combination[0]], combination[0]);
                    return;
                }
                else if (gameMoves[combination[1]] === "") {
                    updateSquare(gameSquares[combination[1]], combination[1]);
                    return;
                }
                else {
                    updateSquare(gameSquares[combination[2]], combination[2]);
                    return;
                }
            }
    }
    randomMove();
}

function randomMove() {
    console.log("random");
    while(true) { 
        let move = Math.floor(Math.random() * 10); //it's a square in which it will put its mark
        if(gameMoves[move] === "") {
            updateSquare(gameSquares[move], move);
            break;
        }
    }
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
        if(gameMoves[i] === "") return switchCpuHuman();
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