import { cpuGame } from "./game_mode_1.js";
import { humanGame } from "./game_mode_2.js";

const playersMarks = new Map([
    ["playerOne", "x"],
    ["playerTwo", "o"]
]);

//below code is for choosing first players mark
const xChoice = document.getElementById("x-player");
const oChoice = document.getElementById("o-player");

xChoice.addEventListener("click", () => {
    if(playersMarks.get("playerOne") === "o") {
        playersMarks.set("playerOne", "x");
        playersMarks.set("playerTwo", "o");
        oChoice.classList.remove("chosen");
        xChoice.classList.add("chosen");
    }
});

oChoice.addEventListener("click", () => {
    if(playersMarks.get("playerOne") === "x") {
        playersMarks.set("playerOne", "o");
        playersMarks.set("playerTwo", "x");
        xChoice.classList.remove("chosen");
        oChoice.classList.add("chosen");
    }
});

//below code is for choosing game mode
const cpuGameMode = document.getElementById("vs-cpu");
const humanGameMode = document.getElementById("vs-human");
const firstPage = document.getElementById("first-page");
const secondPage = document.getElementById("second-page");

cpuGameMode.addEventListener("click", () => {
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    cpuGame(playersMarks);
});

humanGameMode.addEventListener("click", () => {
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    humanGame(playersMarks);
});


