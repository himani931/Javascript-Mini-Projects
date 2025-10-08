let boxes = document.querySelectorAll(".box");
let resetBttn = document.querySelector("#reset-bttn");
let newGameBttn = document.querySelector("#new-bttn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX , playerO
let count =0; // to track draw

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4 ,8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color ="#00ff00";
            turnO = true;
        }
        box.disabled = true;
        count++

        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `CONGRATULATIONS , WINNER IS ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if(posval1 != "" && posval2 != "" && posval3 != "") {
            if(posval1 === posval2  && posval2 === posval3) {
                showWinner(posval1);
                return true;
            }
        }
}
};

newGameBttn.addEventListener("click" , resetGame);
resetBttn.addEventListener("click" , resetGame);