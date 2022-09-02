//Player Logic
const playerFactory = function(xoro) {
    let val = xoro;
    const get = () => val;
    const set = (name) => val = name;
    let up = false;

    return {get, set, up}
}

//Form Logic
const form = (()=>{
    let playerSelection = "";
    const x = document.getElementById('x');
    const o = document.getElementById('o')
    const form = document.getElementById('chooseform');
    const start = document.getElementById('start');
    const formhead = document.getElementById('formhead')

    x.addEventListener('click', ()=> {
        playerSelection = "X";
        formhead.textContent = "You are " + playerSelection + "'s";
    });
    o.addEventListener('click', ()=> {
        playerSelection = "O";
        formhead.textContent = "You are " + playerSelection + "'s";
    });

    let player1 = playerFactory("none");
    let player2 = playerFactory("AI");

    start.addEventListener('click', () => {
        if(!playerSelection) {
            return alert("Please Select X or O by clicking on the icons!");
        }
        form.style.display = "none"
        player1.set(playerSelection)
        player1.up = true;
        if(playerSelection == "O") {
            player2.set("X");
        } else {
            player2.set("O");
        }
    });

    return { player1, player2 }
})();
//Main game logic

//Game Board object
const gameBoard = (() => {
    const tiles = document.querySelectorAll('.tile');

    let playerMove = (p1, p2) => {

        tiles.forEach(tile => {tile.addEventListener('click', (e) => {
                    if(e.target.textContent != "") {
                        return;
                    }
                    e.target.textContent = p1.get();
                    p1.up = false;
                    p2.up = true;
                    console.log(p1.up)
        })});  
    }
  
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    let placeVal = (val, loc) => {
        //val 0-8 left to right top to bottom
        board[parseInt(Math.floor(loc / 3))][loc % 3] = val;
    }
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
        return true;
    }

    return {placeVal, checkWinner, boardFull, printBoard, clearBoard, playerMove}
})();

const firstPlayer = playerFactory("X")
const secondPlayer = playerFactory("O")

gameBoard.playerMove(firstPlayer, secondPlayer);