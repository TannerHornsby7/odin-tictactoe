//Player Logic
const playerFactory = function(xoro, name) {
    up = false;
    return {xoro, name, up}
}

//Form Logic
const form = (()=> {
    let playerSelection = "";
    const x = document.getElementById('x');
    const o = document.getElementById('o')
    const form = document.getElementById('chooseform');
    const start = document.getElementById('start');
    const formhead = document.getElementById('formhead')

    let player1 = playerFactory("X", "john");

    x.addEventListener('click', ()=> {
        playerSelection = "X";
        formhead.textContent = "You are " + playerSelection + "'s";
    });
    o.addEventListener('click', ()=> {
        playerSelection = "O";
        formhead.textContent = "You are " + playerSelection + "'s";
        player1.xoro = "O"
    });

    let player2 = playerFactory("none","AI");

    start.addEventListener('click', () => {
        if(!playerSelection) {
            return alert("Please Select X or O by clicking on the icons!");
        }
        //close the form window
        form.style.display = "none"

        //set player 2 character type
        if(playerSelection == "O") {
            player2.xoro = "X";
        } else {
            player2.xoro = "O";
        }
    });
    return { player1, player2 }
})();



//Game Board object
const gameBoard = (() => {
    let whoisup = form.player1;
    //initialize 2D gameboard array
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const tiles = document.querySelectorAll('.tile');
    const popup = document.createElement('div');
    const body = document.querySelector('.container');

    popup.classList.add("gameending");

    tiles.forEach(tile => {tile.addEventListener('click', (e) => {
        if(e.target.textContent != "") {
            return;
        }
        placeVal(whoisup.xoro, e.target.getAttribute('data-index'))
        if(checkWinner() != false) {
            popup.style.display = "block";
            popup.textContent = whoisup.name.toUpperCase() + " Wins!";
            body.appendChild(popup);
            console.log(body)
            console.log("We got a winner!")
        }
        whoisup = whoisup.xoro == form.player1.xoro ? form.player2 : form.player1;
        updateUI();
    })});

    let checkWinner = () => {

        /*
        8 win conditions:
            1-6: straights
            7-8: diagonals

        */
        for (let i = 0; i < 3; i++) {
            if(board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) { // cols
                return "col Player: " + board[0][i] + " wins!"
            }
            if(board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) { // rows
                return "row Player: " + board[i][0] + " wins!"
            }
        }
        if(board[1][1] && board[1][1] == board[0][2] && board[0][2] == board[2][0]) {
            return "diag Player: " + board[1][1] + " wins!"
        }
        if(board[1][1] && board[1][1] == board[0][0] && board[0][0] == board[2][2]) {
            return "diag Player: " + board[1][1] + " wins!"            
        }
        else {
            return false
        }
    }

    //place value into the gameBoard 2D array
    let placeVal = (val, loc) => {
        board[parseInt(Math.floor(loc / 3))][loc % 3] = val;
    }

    let printBoard = () => {
        for (let i in board) {
            for (let j in board[i]) {
                console.log("value at row: " + i + ", and col: " + j + " is " + board[i][j])
            }
        }
    }
    let clearBoard = () => {
        for (let i in board) {
            for (let j in board[i]) {
                board[i][j] = ""
            }
        }
    }
    let boardFull = () => {
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j] == "") {
                    return false;
                }
            }
        }
        return alert("Board Full");
    }

    updateUI = () => {
            for(let i = 0; i < 9; i++) {
                let val = board[parseInt(Math.floor(i / 3))][i % 3];
                tiles[i].textContent = val
        }
    }

    return {placeVal, checkWinner, boardFull, printBoard, clearBoard, updateUI}
})();


gameBoard.printBoard()
/*
start with p1
place value in the 2d array
switch players
place value in the 2d array


*** I think that gameBoard should take (currentPlayer) as an arguemnt,
using that to decide what to place in each of its spots

*/