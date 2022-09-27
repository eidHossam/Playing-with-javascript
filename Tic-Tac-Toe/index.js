let box = document.querySelectorAll(".box");
let score = document.getElementById("score");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let i = 0;
let X = [];
let O = [];
let running = true;

box.forEach((choice) =>{
    choice.addEventListener("click" , () => {

        if(choice.textContent == "" && running)
        {
                if(i % 2 == 0)
                 {
                     i++;
                    choice.textContent = "X";
                    score.textContent = "O's turn"
                    X.push(choice.id);
                    options[choice.id] = "X";
                }
            else{
                i++;
                choice.textContent = "O";
                score.textContent = "X's turn"
                O.push(choice.id);
                options[choice.id] = "O";

            }

            checkWinner();
        }

        function checkWinner(){
        
            for(let j = 0; j < winConditions.length; j++){
                const condition = winConditions[j];
                const cellA = options[condition[0]];
                const cellB = options[condition[1]];
                const cellC = options[condition[2]];

               
                if(cellA == "" || cellB == "" || cellC == ""){
                    continue;
                }else if(cellA == cellB && cellB == cellC){
                    running = false;
                    score.textContent = cellA + " WINS!.";
                    return;
                } 
            }
                if(i == 9)
                {
                    running = false;
                    score.textContent = "DRAW!.";
                    return;
                }
        }  
    });
});


let restart = document.getElementById("Restart");

restart.addEventListener("click" , () => {
    i = 0;
    box.forEach( (elem) => {
        elem.textContent = "";
    });
    score.textContent = "X's turn";
    running = true;
    options = ["", "", "", "", "", "", "", "", ""];
});