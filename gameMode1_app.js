const gameMoves = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = ["012", "345", "678", "036", "258", "048", "246"];

const turnTxt = document.getElementById("turn");
let turn = "x";
const gameSquares = document.querySelectorAll(".game-square");


export function cpuGame(playersMarks) {
    console.log("inside cpuGame");
    humanMove();


}

function updateSquare(square, value) {
    console.log("inside update function");
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
    result = checkGameOutcome();
}

function cpuMove() {
    console.log("inside cpu move");
    let flag = 1;
    do {
        let move = Math.floor(Math.random() * 10); //it's a square in which it will put its mark
        if(gameMoves[move] === "") {
            updateSquare(gameSquares[move], move);
            flag = 0;
        }
    } while (flag);
    
}

function humanMove() {
    console.log("inside humanMove");
    gameSquares.forEach((square) => {
        square.addEventListener("click",() =>{
            updateSquare(square, square.value);
        });
    });
}

function checkGameOutcome() {
    console.log("inside game check");
    let returnValue = 0;
    for(let combination of winningCombinations) {
        if(gameMoves[combination[0]] === gameMoves[combination[1]] && gameMoves[combination[0]] === gameMoves[combination[3]] && gameMoves[combination[0]] !== "") {
            if(gameMoves[combination[0]] === "x") return 1;
            return 2;
        }
        if(gameMoves[combination[0]] === "" || gameMoves[combination[1]] === "" || gameMoves[combination[3]] === "") returnValue = 3;
    }
    return returnValue;
}