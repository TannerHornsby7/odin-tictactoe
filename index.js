//Main game logic




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