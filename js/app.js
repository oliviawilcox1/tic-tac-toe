//gives a node list we need an array 
const box = Array.from(document.querySelectorAll('.box'))
const reset = document.querySelector('#reset')
const statusMessage = document.querySelector('.statusMessage')

//let because the game will end/change the variable
let gameRunning = true;
//array of blank indexes 
let startGame = ["", "", "", "", "", "", "", "", ""];
// let because the player will change
let firstPlayer = 'X';

statusMessage.innerHTML = `Player is ${firstPlayer}`



const winCombo = [
    [0,1,2],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6],
    [0,4,8]
]


const updateBox =  (index) => {
    startGame[index] = firstPlayer;
    // console.log(firstPlayer)
    box.innerText = `${firstPlayer}`;
    statusMessage.innerHTML = `${firstPlayer}`
    

}

const whosTurn = () => {
    // statusMessage.classList.remove(`X`)
    firstPlayer = firstPlayer === 'X' ? 'O' : 'X';
    console.log(firstPlayer)
    statusMessage.innerHTML = `Player is ${firstPlayer}`
}



 const canIClick = (box) => {
    //determines if the box has already been clicked
    
     if(box.innerText != 'O' && box.innerText !='X') {
         return true;
     } 
     return false;
 }

 const selectBox = (box,index) => {
  
    if (canIClick(box) && gameRunning) {
        box.innerText = firstPlayer;
        // console.log(firstPlayer)
        updateBox(index);
        checkForWin();
        whosTurn();
         
    }
}

//to find out wins we need to loop through the array of winning combos = there are 7 index's
const checkForWin = () => {
    
    let gameWon = false;

    for (let i = 0; i <= 7; i++) {
    
        const indexInArray = winCombo[i];
        // console.log(winCombo[i])
        // console.log(startGame[indexInArray[i]])
        //
        let elementOne = startGame[indexInArray[0]];
        let elementTwo = startGame[indexInArray[1]];
        let elementThree = startGame[indexInArray[2]];


        if (elementOne === '' || elementTwo === '' || elementThree === '') {
            continue;
           }   // statusMessage.classList.remove(`${firstPlayer}`)
           if (elementOne === elementTwo && elementTwo === elementThree) {
            
            gameWon = true;
            console.log(gameWon)
            statusMessage.innerHTML = `Winner is ${firstPlayer}`
            console.log(statusMessage)
            gameRunning = false;

             // cant do return because itll exit whole function;
            break;
           }   
        }
        //Draw would have no space 
            if (!startGame.includes('')) {
             statusMessage.innerHTML = `There is a draw! Play again`
             gameRunning = false;
             return;
      } 
    
}


//play around with order not sure how different function locations affect game





 const clearBoard = () => {
    firstPlayer = 'X'
    startGame = ['', '', '', '', '', '', '', '', ''];
    box.forEach(box => box.innerText = '')
    statusMessage.innerHTML = `Board is cleared. It is ${firstPlayer}'s turn!`
    gameRunning = true;
 }

reset.addEventListener('click', clearBoard)
box.forEach((box,index) => {box.addEventListener('click', () => selectBox(box,index));});
