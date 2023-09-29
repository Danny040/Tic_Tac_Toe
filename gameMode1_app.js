const gameProcess = new Map([
    ["1", ""],
    ["2", ""],
    ["3", ""],
    ["4", ""],
    ["5", ""],
    ["6", ""],
    ["7", ""],
    ["8", ""],
    ["9", ""],
]);

const turnTxt = document.getElementById("turn");
let turn = "x";
const gameSquares = document.querySelectorAll(".game-square");

export function cpuGame(playersMarks) {

    if (playersMarks.get("playerOne") === "o") {
        cpuMove();
    }
    else {
        humanMove();
    }
}

function updateSquare(square, value) {
    if (gameProcess.get(value) !== "") {
        alert("This is taken.");
        return;
    }
    gameProcess.set(value, turn);
    square.innerHTML = turn;
    square.classList.add(`${turn}-move`);
    if ( turn === "x") {
        turn = "o";
    }
    else {
        turn = "x";
    }
    turnTxt.innerHTML = turn;
}

function cpuMove() {
    let move = Math.floor(Math.random() * 11);
    
}

function humanMove() {
    gameSquares.forEach((square) => {
        square.addEventListener("click",() =>{
            updateSquare(square, square.value);
        });
    });
}