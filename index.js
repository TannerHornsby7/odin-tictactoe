//Player Logic
const playerFactory = function(xoro, name) {
    let wins = 0;
    const won = ()=>wins+=1;
    const getWins =()=>wins;
    return {xoro, name, won, getWins}
}

//Initial Entry logic
const entry =(()=>{
    const ai = document.getElementById('aibutton');
    const pvp = document.getElementById('pvpbutton')

    // ai.addEventListener('click', ()=>{
    //     //if ai is selected, we must modify the form
    // })

    // pvp.addEventListener('click', ()=>{
    //     //if pvp is selected, we simply go to the form
    // })
})()

//PVP Form Logic
const form = (()=> {

    const form = document.getElementById('pvpform');
    const overlay = document.getElementById('overlay');
    const start = document.getElementById('start');
    const formhead = document.getElementById('formhead');

    let playerX = playerFactory("X", "AI");
    let playerO = playerFactory("O", "AI");     

    start.addEventListener('click', () => {
        let pxname = document.getElementById('pxname').value;
        let poname = document.getElementById('poname').value;


        console.log(pxname);

        if(!pxname || !poname) {
            return alert("Please Enter Both Player Names or Choose AI!");
        }
        //close the form window
        form.style.display = "none"
        overlay.style.display = "none"


        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }          
        //formatting names
        pxname = capitalizeFirstLetter(pxname);
        poname = capitalizeFirstLetter(poname)

        //setting player names
        playerX.name = pxname;
        playerO.name = poname;
        
    });

 
    return { playerX, playerO }
})();



//Game Board object
const gameBoard = (() => {
    let whoisup = form.playerX;
    //initialize 2D gameboard array
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const tiles = document.querySelectorAll('.tile');
    const popup = document.createElement('div');
    const body = document.querySelector('.container');
    const cta = document.getElementById('cta');
    const reset = document.getElementById('reset');
    const xwins = document.getElementById('xwins');
    const owins = document.getElementById('owins')



    popup.classList.add("gameending");
    popup.style.display = "block";

    


    tiles.forEach(tile => {tile.addEventListener('click', (e) => {
        if(e.target.textContent != "") {
            return;
        }
        placeVal(whoisup.xoro, e.target.getAttribute('data-index'))
        if(checkWinner() != false) {
            cta.textContent = whoisup.name + " Wins, Good Game!"
            whoisup.won();
            xwins.textContent = form.playerX.name + ": " + form.playerX.getWins();
            owins.textContent = form.playerO.name + ": " + form.playerO.getWins();
            clearBoard()
        } else if (boardFull()) {
            cta.textContent = "It's A Tie!"
            clearBoard()
        } else {
            whoisup = whoisup.xoro == form.playerX.xoro ? form.playerO : form.playerX;
            cta.textContent = "It is " + whoisup.name + "'s Turn"
        }
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
        return true;
    }

    updateUI = () => {
            for(let i = 0; i < 9; i++) {
                let val = board[parseInt(Math.floor(i / 3))][i % 3];
                tiles[i].textContent = val
        }
    }


    //on reset clear board
    reset.addEventListener('click', () => {
        clearBoard()
        updateUI()
    });


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