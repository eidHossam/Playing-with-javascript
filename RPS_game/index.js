let button = document.querySelectorAll("button");
let player = document.getElementById("player");
let computer = document.getElementById("computer");
let result = document.getElementById("result");
let computerChoices = ["Rock" , "Paper", "Scissors"];

button.forEach((elem) => {
    elem.addEventListener("click" , () => {
        
        let playerChoice = (elem.id);
        player.textContent = "Player: " + playerChoice;

        let random_index = Math.floor(Math.random() * 3);
        let computerChoice = computerChoices[random_index];
        computer.textContent = "Computer: " + computerChoice;

        result.textContent = check_win();

        function check_win()
        {
            if(playerChoice == computerChoice)
            {
                return "Draw!.";
            }else if(playerChoice == "Rock")
            {
                return ((computerChoice == "Scissors"))? "The Player wins!." : "The player loses!.";
            }else if(playerChoice == "Paper")
            {
                return ((computerChoice == "Scissors"))? "The player loses!.": "The Player wins!." ; 
            }else if(playerChoice == "Scissors")
            {
                return ((computerChoice == "Rock"))? "The player loses!.": "The Player wins!." ; 
            }
        }
      
    });
});