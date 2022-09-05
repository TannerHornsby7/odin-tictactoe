'use strict';

// Player Logic
const playerFactory = function(xoro, n) {
    let wins = 0;
    let ai = false;
    let vsai = false;
    let name = n;

    const won = ()=>wins+=1;
    const getWins =()=> wins;
    const setWins =(x)=> wins = x;
    const setAI =(t)=> ai = t;
    const getAI =()=> ai;
    const setVSAI =(t)=> vsai = t;
    const getVSAI =()=> vsai;
    const setName =(n)=> name = n;
    const getName = ()=> name;

    function reset() {
        this.setWins(0);
        this.setAI(false);
        this.setVSAI(false);
    }
    return {xoro, won, getWins, setWins, getAI, setAI, getVSAI, setVSAI, getName, setName, reset }
}

// Initial Entry logic
const modeSelectionForm =(()=>{
    const modeform = document.getElementById('modeform')
    const ai = document.getElementById('selectpvai');
    const pvp = document.getElementById('selectpvp');
    const aiform = document.getElementById('pvaiform');
    const pvpform = document.getElementById('pvpform');

    let gametype = null;

    ai.addEventListener('click', ()=>{
        modeform.style.display = "none";
        aiform.style.display = "grid";
        gametype = "AI";
    })

    pvp.addEventListener('click', ()=>{
        modeform.style.display = "none";
        pvpform.style.display = "grid";
        gametype = "PVP"
    })

    return { gametype }
})()

// Prototype Form Logic
const form = (()=> {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }          

    function formatName(name) {
        return capitalizeFirstLetter(name);
    }

    function closeForm(form) {
        const overlay = document.getElementById('overlay');
        form.style.display = "none"
        overlay.style.display = "none" 
    }
    const playerX = playerFactory("X", "Blank");
    const playerO = playerFactory("O", "Blank");

    function setPlayerNames(nx, no){
        playerX.setName(formatName(nx));
        playerO.setName(formatName(no));    
    }
    return { playerX, playerO, setPlayerNames, closeForm}
})();

// PVAI Mode Logic
const pvaiform = (()=> {
    let clicked = false;
    let hard = false;

    const difficulty = document.getElementById('difficulty')
    const pvaiform = document.getElementById('pvaiform');
    const overlay = document.getElementById('overlay');
    const start = document.getElementById('startpvai');
    const formhead = document.getElementById('formheadai');
    const o = document.getElementById('o');
    const x = document.getElementById('x');

    
    //adding click event listeners to set ai and player
    o.addEventListener('click', ()=>{
        form.playerX.setName("AI");
        form.playerO.setName("Player");
        formhead.textContent = "You are O's"
        form.playerX.setVSAI(false);
        form.playerO.setVSAI(true);
        form.playerO.setAI(false);
        form.playerX.setAI(true);
        clicked = true;
    })
    x.addEventListener('click', ()=>{
        form.playerX.setName("Player");
        form.playerO.setName("AI");
        formhead.textContent = "You are X's"
        form.playerX.setVSAI(true);
        form.playerO.setVSAI(false);
        form.playerO.setAI(true);
        form.playerX.setAI(false);
        clicked = true;
    })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getAIPlayer() {
        if(form.playerX.getAI()) {
            return form.playerX;
        }
        else {
            return form.playerO;
        }
    }

    // adding dificulty button click listener
    difficulty.addEventListener('click', ()=>{
        if(difficulty.textContent == "EASY") {
            difficulty.textContent = "HARD";
            difficulty.classList.add("hard");
            hard = true;
        } else {
            difficulty.textContent = "EASY"
            difficulty.classList.remove("hard")
            hard = false;
        }
    });
    
    function getAIMove(board) {
        if(hard) {
            // Implement Hard Mode
            console.log("HARD")
        }
        else {
            let x = getRandomInt(3)
            let y = getRandomInt(3)
            while(board[x][y] != "") {
                x = getRandomInt(3);
                y = getRandomInt(3);
            }
            board[x][y] = getAIPlayer().xoro;
        }
    }

   start.addEventListener('click', () => {

        // make sure user select their icon type
        if(!clicked) {
            return alert("Please Select Your Icon (X or O)");
        }

        gameBoard.ctaboard.textContent = "";

        // close form and erase overlay
        form.closeForm(pvaiform);
    }); 



    return { getAIMove, getAIPlayer, clicked }
})();

// PVP Mode Logic
const pvpform = (()=> {

    const pvpform = document.getElementById('pvpform');
    const start = document.getElementById('startpvp');

    start.addEventListener('click', () => {
        let pxname = document.getElementById('pxname').value;
        let poname = document.getElementById('poname').value;

        // check both names are entered
        if(!pxname || !poname) {
            return alert("Please Enter Both Player Names or Choose AI!");
        }

        // close window and erase overlay
        form.closeForm(pvpform)

        // setting player names
        form.setPlayerNames(pxname, poname);
    });
})();

// Win Form Logic 
const winform = (()=>{
    const winform = document.getElementById('winform');
    const btmbtn = document.getElementById('menu');
    const pabtn = document.getElementById('playagain');
    const modeform = document.getElementById('modeform');

    btmbtn.addEventListener('click', ()=>{
        modeform.style.display = "grid"
        winform.style.display = "none";
        form.playerO.reset();
        form.playerX.reset();
        console.log(form.playerO)
    })

    pabtn.addEventListener('click', ()=>{
        form.closeForm(winform);
    })

    function openForm() {
        winform.style.display = "grid";
        overlay.style.display = "block"
    }

    return { openForm }
})()

// Game Board object
const gameBoard = (() => {
    var whoisup = form.playerX;
    const pvaistart = document.getElementById('startpvai');
    pvaistart.addEventListener('click', ()=>{
        whoisup = form.playerX.getAI() ? form.playerO : form.playerX;
        console.log("pvaistartclicked")
    })
    // Initialize 2D gameboard array
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    // Selecting DOM Elemets
    const tiles = document.querySelectorAll('.tile');
    const cta = document.getElementById('cta');
    const ctaboard = document.getElementById('ctaboard')
    const reset = document.getElementById('reset');
    const xwins = document.getElementById('xwins');
    const owins = document.getElementById('owins');


    tiles.forEach(tile => {tile.addEventListener('click', (e) => {
        // prevent move collisions
        if(e.target.textContent != "") {
            return;
        }

        placeMove(whoisup, e.target.getAttribute('data-index'))
        updateUI();
    })});

    let checkWinner = () => {
        // check straights
        for (let i = 0; i < 3; i++) {
            if(board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) { // cols
                return board[0][i]
            }
            if(board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) { // rows
                return board[i][0]
            }
        }

        // check diagonals
        if( board[1][1] && board[1][1] == board[0][2] && board[0][2] == board[2][0] ||
            board[1][1] && board[1][1] == board[0][0] && board[0][0] == board[2][2]) {
                return board[1][1];;
            }
        else {
            return false
        }
    }

    // place value into array
    const placeVal = (val, loc) => {
        board[parseInt(Math.floor(loc / 3))][loc % 3] = val;
    }

    // check if a move ended the game
    const gameOver = (player) => {
        if(checkWinner()) {
            cta.textContent = player.getName() + " Wins, Good Game!"
            player.won();
            xwins.textContent = form.playerX.getName() + ": " + form.playerX.getWins();
            owins.textContent = form.playerO.getName() + ": " + form.playerO.getWins();
            return true;
        } else if (boardFull()) {
            cta.textContent = "It's A Tie!"
            tie = true;
            return true;
        } else {
            return false;
        }
    }

    // place a move and see if it ended the game, switching the next player
    let placeMove = (player, loc) => {

        placeVal(player.xoro, loc);
        updateUI();

        if(gameOver(player)) {
            winform.openForm();
            clearBoard();
            return;
        }
        if(player.getVSAI()) {
            pvaiform.getAIMove(board);
            updateUI();
            if(gameOver(pvaiform.getAIPlayer())) {
                winform.openForm();
                clearBoard();
                return;
            }
        } else {
            whoisup = whoisup.xoro == form.playerX.xoro ? form.playerO : form.playerX;
            ctaboard.textContent = "It is " + whoisup.getName() + "'s Turn"
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

    // check if the board is full
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

    // update the DOM based on array elements
    const updateUI = () => {
            for(let i = 0; i < 9; i++) {
                let val = board[parseInt(Math.floor(i / 3))][i % 3];
                tiles[i].textContent = val
        }
    }

    reset.addEventListener('click', () => {
        clearBoard()
        updateUI()
    });

    return {placeVal, checkWinner, boardFull, printBoard, clearBoard, updateUI, ctaboard}
})();