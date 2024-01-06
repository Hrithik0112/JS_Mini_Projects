const gameinfo = document.querySelector(".current-player");
const boxes = document.querySelectorAll(".box");
const newbtn = document.querySelector(".new-game")

let currentplayer;
let gamegrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//let's create a function to initialise the game
function initGame() {
    currentplayer = "X";
    gamegrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newbtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initGame();

function swapTurn() {
    if(currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer = "X";
    }
    //UI Update
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "") 
            && (gamegrid[position[0]] === gamegrid[position[1]] ) && (gamegrid[position[1]] === gamegrid[position[2]])) {

                //check if winner is X
                if(gamegrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameinfo.innerText = `Winner Player - ${answer}`;
        newbtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gamegrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameinfo.innerText = "Game Tied !";
        newbtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gamegrid[index] === "" ) {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newbtn.addEventListener("click", initGame);