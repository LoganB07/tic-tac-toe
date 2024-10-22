const Game = (function() {
    let isTwoPlayer = false;
    let player1;
    let player2;
    let gameboard = [["","",""],["","",""],["","",""]];
    let currentPlayer;

    return {isTwoPlayer, player1, player2, gameboard, currentPlayer};
})();

function createPlayer(name, mark) {
    return {name, mark}
}

function playGame() {
    let name = prompt("Player 1 name");
    Game.player1 = createPlayer(name, "X");
    Game.currentPlayer = Game.player1;
    if (Game.isTwoPlayer) {
        name = prompt("Player 2 name");
        Game.player2 = createPlayer(name, "O");
    }
    else {Game.player2 = createPlayer("Comp", "O");}
    document.querySelector(".p1").textContent = `${Game.player1.name}`;
    document.querySelector(".p2").textContent = `${Game.player2.name}`;
    console.log(Game);
}

function updatePlayers() {
    if (Game.isTwoPlayer) {
        Game.isTwoPlayer = false;
        document.querySelector(".player-btn").textContent = "One Player"
    }
    else {
        Game.isTwoPlayer = true;
        document.querySelector(".player-btn").textContent = "Two Player"
    }
}

function createGameBoard() {
    const gametable = document.querySelector("#gametable");
    gametable.removeChild(document.querySelector(".start"));

    let gameboard = document.createElement("div");
    gameboard.classList.add("gameboard");

    for (let i = 1; i <= 3; i++) {
        let box = document.createElement("div");
        box.classList.add(`a${i}`);
        box.addEventListener("click", function addMark() {
            playRound(1, i);
            this.removeEventListener("click", addMark)
        });
        gameboard.appendChild(box);
    }
    for (let i = 1; i <= 3; i++) {
        let box = document.createElement("div");
        box.classList.add(`b${i}`);
        box.addEventListener("click", function addMark() {
            playRound(2, i);
            this.removeEventListener("click", addMark)
        });
        gameboard.appendChild(box);
    }
    for (let i = 1; i <= 3; i++) {
        let box = document.createElement("div");
        box.classList.add(`c${i}`);
        box.addEventListener("click", function addMark(){
            playRound(3, i);
            this.removeEventListener("click", addMark)
        });
        gameboard.appendChild(box);
    }
    
    gametable.appendChild(gameboard);
}

function checkForWin() {
    count = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (Game.gameboard[row][col] == Game.currentPlayer.mark){count += 1}
        }
        if (count == 3) {
            console.log(`win detected in row ${row}`);
            return true;}
        else {count = 0}
    }

    if (count == 0){
        for (let col = 0; col < 3; col++){
            for (let row = 0; row < 3; row++){
                if (Game.gameboard[row][col] == Game.currentPlayer.mark){count += 1}
            }
            if (count == 3) {
                console.log(`win detected in col ${col}`);
                return true;}
            else {count = 0}
        }
    }

    if (count == 0) {
        if (Game.gameboard[0][0] == Game.currentPlayer.mark && Game.gameboard[1][1] == Game.gameboard[0][0] && Game.gameboard[2][2] == Game.gameboard[0][0]) {
            console.log("win detected in diagnol 0");
            return true;
        }
        if (Game.gameboard[0][2] == Game.currentPlayer.mark && Game.gameboard[1][1] == Game.gameboard[0][2] && Game.gameboard[2][0] == Game.gameboard[0][2]) {
            console.log("win detected in diagnol 1");
            return true;
        }
    }

    if (count == 0) {return false;}
}

function playRound(row, col) {
    let box;
    switch (row) {
        case 1:
            box = document.querySelector(`.a${col}`);
            console.log(`selected a${col}`);
            box.textContent = Game.currentPlayer.mark;
            Game.gameboard[0][col-1] = Game.currentPlayer.mark;
            break;
        case 2:
            box = document.querySelector(`.b${col}`);
            console.log(`selected b${col}`);
            box.textContent = Game.currentPlayer.mark;
            Game.gameboard[1][col-1] = Game.currentPlayer.mark;
            break;
        case 3:
            box = document.querySelector(`.c${col}`);
            console.log(`selected c${col}`);
            box.textContent = Game.currentPlayer.mark;
            Game.gameboard[2][col-1] = Game.currentPlayer.mark; 
            break;         
    }

    if (checkForWin()) {
        alert(`The winner is ${Game.currentPlayer.name}!`);
        location.reload();
    }

    if (Game.currentPlayer == Game.player1) {Game.currentPlayer = Game.player2;}
    else {Game.currentPlayer = Game.player1;}
    console.log(Game);
    
}

let startBtn = document.querySelector(".start");
startBtn.addEventListener("click", ()=>{
    createGameBoard();
    playGame();
});

let playersBtn = document.querySelector(".player-btn");
playersBtn.addEventListener("click", ()=>{
    updatePlayers();
})

