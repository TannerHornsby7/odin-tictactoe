//Main game logic

//Game Board object

const gameBoard = (() => {
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
            return "It's a tie"
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

    return {placeVal, checkWinner, printBoard, clearBoard}
})();

gameBoard.placeVal("X", 0);
gameBoard.placeVal("X", 1);
gameBoard.placeVal("X", 2);
gameBoard.printBoard();
console.log(gameBoard.checkWinner());
gameBoard.placeVal("O", 0);
gameBoard.printBoard();
console.log(gameBoard.checkWinner());
gameBoard.clearBoard();
gameBoard.printBoard();




// // //factory function

// const pickleBoy = () => {
//     const sayPickle = () => console.log("pickle")
//     return { sayPickle }
// }

// const objFactory = function (fruit) {
//     let favFruit = "Favorite fruit is: " + fruit;
//     const {sayPickle} = pickleBoy();
//     const printFruits = () => console.log(favFruit)
//     return { sayPickle, printFruits }
// }

// let bananaFact = objFactory("banana")
// let appleFact = objFactory("apple")

// bananaFact.printFruits();
// appleFact.printFruits();
// appleFact.sayPickle();

// //IIFE

// const blueberryBunch = (() => {
//     let bunches = 6
//     let add = () => bunches += 1;
//     let get = function () {
//         return bunches
//     }
//     return {add, get}
// })()

// console.log(blueberryBunch.get())
// blueberryBunch.add()
// console.log(blueberryBunch.get())