const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");
const startBtn = document.querySelector("#start");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const backgroundColor = "white";
const snakeColor = "lightgreen";
const snakeBorder = "white";
const foodColor = "red";
let foodX = 0;
let foodY = 0;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let snake = [
    {x:unitSize * 4 , y : 200},
    {x:unitSize * 3 , y : 200},
    {x:unitSize * 2 , y : 200},
];
let running = false;
let timer = null;
let atefood = true;

resetBtn.addEventListener("click", reset);
startBtn.addEventListener("click", start);
window.addEventListener("keydown", chanegeDirection);

function start()
{
    if(!running)
    {
        ctx.clearRect(0,0,gameWidth,gameHeight);

        scoreText.textContent = "Score: " + score;

        drawSnake();
    
        timer = setInterval(move, 33);

        running = true;
    }
}

function move()
{ 
    eraseLastPart(); 

    drawPart();
    
    updatePosition();

    if(gameover())
    {
        // clearInterval(timer);
        // running = false;
        reset();
        
        printGameover();
        return;
    }

    checkFood();

    if(atefood)
    {
        drawFood();
        atefood = false;

        addSnakePart();
    }
    
    //check if there was an error with drawing the food
    if (ctx.getImageData(foodX, foodY, unitSize, unitSize).data[0] != 255)
    {
        drawFood();
    }

    function printGameover()
    {
        ctx.fillStyle = "black";
        ctx.font = "50px  MV Boli";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", gameWidth/2, gameHeight/2);
    }

    function addSnakePart()
    {
        lastPartX = snake[snake.length - 1].x - unitSize;
        lastPartY = snake[snake.length - 1].y - unitSize;
        snake.push({x:lastPartX, y:lastPartY});
    }

    function checkFood()
    {
        if(snake[0].x == foodX && snake[0].y == foodY)
        {
            scoreText.textContent = "Score: " + ++score;
            atefood = true;
        }    
    }

    function updatePosition()
    {
        let temp = snake.pop();
        temp.x = snake[0].x + xVelocity;
        temp.y = snake[0].y + yVelocity;
        snake.unshift(temp);
    }

    function drawPart()
    {
        ctx.fillStyle = snakeColor;
        ctx.fillRect((snake[0].x + xVelocity), (snake[0].y + yVelocity), unitSize, unitSize);
        ctx.strokeRect((snake[0].x + xVelocity), (snake[0].y + yVelocity), unitSize, unitSize);
    }

    function eraseLastPart()
    {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(snake[snake.length - 1].x, snake[snake.length - 1].y,unitSize, unitSize);
    }
}

function gameover()
{
    if(snake[0].x >= 450 || snake[0].y >= 450 || snake[0].x < 0 || snake[0].y < 0  )
        return true;
    
    for( var i = 1; i < snake.length; i++ )
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
            return true;
    }

    return false;
}


function clearBoard()
{
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}

function drawFood()
{
   let insideSnake = true ;
   
    while(insideSnake)
    {
        foodX = (Math.floor(Math.random() * 19) * unitSize);
        foodY = (Math.floor(Math.random() * 19) * unitSize);
        
        for(let i = 0; i < snake.length; i++)
        {
            if(snake[i].x == foodX && snake[i].y == foodY)
            {
                insideSnake = true;
                break;
            }else{
                insideSnake = false;
            }
        }
        
    }
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function chanegeDirection(event){
    keyPressed = event.keyCode;
    const left =37;
    const right =39;
    const up = 38;
    const down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    if(keyPressed == left && !goingRight)
    {
        xVelocity = -unitSize;
        yVelocity = 0;
    }else if(keyPressed == right && !goingLeft)
    {
        xVelocity = unitSize;
        yVelocity = 0;
    }else if(keyPressed == up && !goingDown)
    {
        xVelocity = 0;
        yVelocity = -unitSize;
    }else if(keyPressed == down && !goingUp)
    {
        xVelocity = 0;
        yVelocity = unitSize;
    }
};

function drawSnake()
{
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((rec) => {
        ctx.fillRect(rec.x, rec.y , unitSize, unitSize);
        ctx.strokeRect(rec.x, rec.y , unitSize, unitSize);
    });
}


function reset(){

    running = false;
    
    // ctx.clearRect(0,0,gameWidth,gameHeight);
    
    snake = [
        {x:unitSize * 4 , y : 0},
        {x:unitSize * 3 , y : 0},
        {x:unitSize * 2 , y : 0},
    ];
    
    clearInterval(timer);
    
    // drawSnake();
    
    xVelocity = unitSize;
    yVelocity = 0;

    score = 0;
    // scoreText.textContent = score;
    atefood = true; 

    printResetMsg();
}

function printResetMsg()
{
    ctx.fillStyle = "black";
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("Press start to play!.", gameWidth/2, 300);
}