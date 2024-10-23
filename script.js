const Game = (function() {
    let isTwoPlayer = false;
    let player1;
    let player2;
    let gameboard = [["","",""],["","",""],["","",""]];
    let currentPlayer;
    let squaresFilled = 0;

    return {isTwoPlayer, player1, player2, gameboard, currentPlayer, squaresFilled};
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
            Game.currentPlayer = Game.player2;
            if (Game.currentPlayer.name = "Comp" && Game.squaresFilled < 9) {playCompRound();}
            console.log(Game.gameboard);
            this.removeEventListener("click", addMark)
        });
        gameboard.appendChild(box);
    }
    for (let i = 1; i <= 3; i++) {
        let box = document.createElement("div");
        box.classList.add(`b${i}`);
        box.addEventListener("click", function addMark() {
            playRound(2, i);
            Game.currentPlayer = Game.player2;
            if (Game.currentPlayer.name = "Comp" && Game.squaresFilled < 9) {playCompRound();}
            console.log(Game.gameboard);
            this.removeEventListener("click", addMark)
        });
        gameboard.appendChild(box);
    }
    for (let i = 1; i <= 3; i++) {
        let box = document.createElement("div");
        box.classList.add(`c${i}`);
        box.addEventListener("click", function addMark(){
            playRound(3, i);
            Game.currentPlayer = Game.player2;
            if (Game.currentPlayer.name = "Comp" && Game.squaresFilled < 9) {playCompRound();}
            console.log(Game.gameboard);
            
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

    
    Game.squaresFilled += 1;
    console.log(`${Game.squaresFilled} squares filled`)
    if (Game.squaresFilled == 9) {
        alert("Well looks like it's a tie!")
        location.reload();
    }
    
}

function playCompRound() {
    let rchoice = -1;
    let cchoice = -1;
    let winFound = false;
    let blockFound = false;
    if (Game.squaresFilled >= 3) {
        console.log("Checking if win is possible...")
        for (let row = 0; row < 3; row++){
            if (foundWin("row", row)){
                console.log("win found")
                for (let col = 0; col < 3; col++) {
                    if (Game.gameboard[row][col] == "") {
                        rchoice = row;
                        cchoice = col;
                        winFound = true;
                        break;
                    }
                }
            }
        }

        if (!winFound) {
        for (let col = 0; col < 3; col++){
            if (foundWin("col", col)){
                console.log("win found")
                for (let row = 0; row < 3; row++) {
                    if (Game.gameboard[row][col] == "") {
                        rchoice = row;
                        cchoice = col;
                        winFound = true;
                        break;
                    }
                }
            }
        }
    }

        if (!winFound) {
        if (foundWin("D", 0)) {
            console.log("win found")
            winFound = true;
            if (Game.gameboard[0][0] == ""){
                rchoice = 0;
                cchoice = 0;
            }
            if (Game.gameboard[1][1] == ""){
                rchoice = 1;
                cchoice = 1;
            }
            if (Game.gameboard[2][2] == ""){
                rchoice = 2;
                cchoice = 2;
            }
        }
    }
    
        if (!winFound) {
            if (foundWin("D", 1)) {
            console.log("win found")
            winFound = true;
            if (Game.gameboard[0][2] == ""){
                rchoice = 0;
                cchoice = 2;
            }
            if (Game.gameboard[1][1] == ""){
                rchoice = 1;
                cchoice = 1;
            }
            if (Game.gameboard[2][0] == ""){
                rchoice = 2;
                cchoice = 0;
            }
        }
    }

    if (!winFound) {
        console.log("No wins found. Checking blocks...");
        for (let row = 0; row < 3; row++){
            if (foundBlock("row", row)){
                console.log("block found")
                for (let col = 0; col < 3; col++) {
                    if (Game.gameboard[row][col] == "") {
                        rchoice = row;
                        cchoice = col;
                        blockFound = true;
                        break;
                    }
                }
            }
        }
        if (!blockFound) {
            for (let col = 0; col < 3; col++){
                if (foundBlock("col", col)){
                    console.log("block found")
                    for (let row = 0; row < 3; row++) {
                        if (Game.gameboard[row][col] == "") {
                            rchoice = row;
                            cchoice = col;
                            blockFound = true;
                            break;
                        }
                    }
                }
            }
        }

        if (!blockFound) {
            if (foundBlock("D", 0)) {
                console.log("block found")
                blockFound = true;
                if (Game.gameboard[0][0] == ""){
                    rchoice = 0;
                    cchoice = 0;
                }
                if (Game.gameboard[1][1] == ""){
                    rchoice = 1;
                    cchoice = 1;
                }
                if (Game.gameboard[2][2] == ""){
                    rchoice = 2;
                    cchoice = 2;
                }
            }
        }
        
            if (!blockFound) {
                if (foundBlock("D", 1)) {
                console.log("block found")
                blockFound = true;
                if (Game.gameboard[0][2] == ""){
                    rchoice = 0;
                    cchoice = 2;
                }
                if (Game.gameboard[1][1] == ""){
                    rchoice = 1;
                    cchoice = 1;
                }
                if (Game.gameboard[2][0] == ""){
                    rchoice = 2;
                    cchoice = 0;
                }
            }
        }

    }
    }
    if (rchoice == -1 || cchoice == -1) {
        console.log("none found")
        randomChoice();
    }
    else {
        switch (rchoice) {
            case 0:
                document.querySelector(`.a${cchoice + 1}`).textContent = Game.currentPlayer.mark;
                Game.gameboard[0][cchoice] = Game.currentPlayer.mark;
                break;
            case 1:
                document.querySelector(`.b${cchoice + 1}`).textContent = Game.currentPlayer.mark;
                Game.gameboard[1][cchoice] = Game.currentPlayer.mark;
                break;
            case 2:
                document.querySelector(`.c${cchoice + 1}`).textContent = Game.currentPlayer.mark;
                Game.gameboard[2][cchoice] = Game.currentPlayer.mark;
                break;
        }
        console.log(`comp chose ${rchoice} ${cchoice}`);
    }
    Game.squaresFilled += 1;
    console.log(`${Game.squaresFilled} squares filled`)
    if (checkForWin()) {
        alert(`The winner is ${Game.currentPlayer.name}!`);
        location.reload();
    }
    
    else if (Game.squaresFilled == 9) {
        alert("Well looks like it's a tie!")
        location.reload();
    }
    Game.currentPlayer = Game.player1;
}

function foundWin(checkType, checkValue) {
    let Xcount = 0;
    let Ocount = 0;
    switch (checkType) {
        case "row":
            for (let col = 0; col < 3; col++){
                if (Game.gameboard[checkValue][col] == Game.currentPlayer.mark) {Ocount += 1;}
                if (Game.gameboard[checkValue][col] == Game.player1.mark) {Xcount += 1;}
            }
            if (Ocount == 2 && Xcount == 0) {return true;}
            else {return false;}
        case "col":
            for (let row = 0; row < 3; row++){
                if (Game.gameboard[row][checkValue] == Game.currentPlayer.mark) {Ocount += 1;}
                if (Game.gameboard[row][checkValue] == Game.player1.mark) {Xcount += 1;}
            }
            if (Ocount == 2 && Xcount == 0) {return true;}
            else {return false;}
        case "D":
            switch (checkValue){
                case 0:
                    if (Game.gameboard[0][0] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[0][0] == Game.player1.mark) {Xcount += 1;}

                    if (Game.gameboard[1][1] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[1][1] == Game.player1.mark) {Xcount += 1;}

                    if (Game.gameboard[2][2] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[2][2] == Game.player1.mark) {Xcount += 1;}
                    break;
                case 1:
                    if (Game.gameboard[0][2] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[0][2] == Game.player1.mark) {Xcount += 1;}

                    if (Game.gameboard[1][1] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[1][1] == Game.player1.mark) {Xcount += 1;}

                    if (Game.gameboard[2][0] == Game.currentPlayer.mark) {Ocount += 1;}
                    if (Game.gameboard[2][0] == Game.player1.mark) {Xcount += 1;}
                    break;
            }
            if (Ocount == 2 && Xcount == 0) {return true;}
            else {return false;}
    }
}

function foundBlock(checkType, checkValue) {
    console.log(`Checking for block`);
    let Xcount = 0;
    let Ocount = 0;
    switch (checkType) {
        case "row":
            for (let col = 0; col < 3; col++){
                if (Game.gameboard[checkValue][col] == "O") {Ocount += 1;}
                if (Game.gameboard[checkValue][col] == "X") {Xcount += 1;}
            }
            if (Ocount == 0 && Xcount == 2) {return true;}
            else {return false;}
        case "col":
            for (let row = 0; row < 3; row++){
                if (Game.gameboard[row][checkValue] == "O") {Ocount += 1;}
                if (Game.gameboard[row][checkValue] == "X") {Xcount += 1;}
            }
            if (Ocount == 0 && Xcount == 2) {return true;}
            else {return false;}
        case "D":
            switch (checkValue){
                case 0:
                    if (Game.gameboard[0][0] == "O") {Ocount += 1;}
                    if (Game.gameboard[0][0] == "X") {Xcount += 1;}

                    if (Game.gameboard[1][1] == "O") {Ocount += 1;}
                    if (Game.gameboard[1][1] == "X") {Xcount += 1;}

                    if (Game.gameboard[2][2] == "O") {Ocount += 1;}
                    if (Game.gameboard[2][2] == "X") {Xcount += 1;}
                    break;
                case 1:
                    if (Game.gameboard[0][2] == "O") {Ocount += 1;}
                    if (Game.gameboard[0][2] == "X") {Xcount += 1;}

                    if (Game.gameboard[1][1] == "O") {Ocount += 1;}
                    if (Game.gameboard[1][1] == "X") {Xcount += 1;}

                    if (Game.gameboard[2][0] == "O") {Ocount += 1;}
                    if (Game.gameboard[2][0] == "X") {Xcount += 1;}
                    break;
            }
            if (Ocount == 0 && Xcount == 2) {return true;}
            else {return false;}
    }
}

function randomChoice() {
    const MIN = 0;
    const MAX = 2;

    while (true) {
        let row = Math.floor((Math.random() * (MAX - MIN) + MIN));
        let col = Math.floor((Math.random() * (MAX - MIN) + MIN));

        if (Game.gameboard[row][col] == "") {
            switch (row) {
                case 0:
                    document.querySelector(`.a${col + 1}`).textContent = Game.currentPlayer.mark;
                    Game.gameboard[0][col] = Game.currentPlayer.mark;
                    break;
                case 1:
                    document.querySelector(`.b${col + 1}`).textContent = Game.currentPlayer.mark;
                    Game.gameboard[1][col] = Game.currentPlayer.mark;
                    break;
                case 2:
                    document.querySelector(`.c${col + 1}`).textContent = Game.currentPlayer.mark;
                    Game.gameboard[2][col] = Game.currentPlayer.mark;
                    break;
            }
            console.log(`comp chose ${row} ${col}`);
        break;
        }
        console.log("Oop full here")
    }



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

