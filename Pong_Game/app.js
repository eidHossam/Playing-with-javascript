const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector('#score');
const startbtn = document.querySelector("#start");
const resetbtn = document.querySelector("#reset");
const boardBackgroundColor = "forestgreen";
const borderColor = "black";
const paddleSpeed = 50;
let p1Score = 0;
let p2Score = 0;
let timer = null;
let running = false;
let paddle2= {
    width: 25,
    height:100,
    x: 0,
    y: 0,
    color: "lightblue",
}
let paddle1= {
    width: 25,
    height:100,
    x: 425,
    y: 350,
    color: "red",
}
let ball = {
    radius: 12.5,
    color: "yellow",
    x:225,
    y:225,
    velocityX: 5,
    velocityY: 0,
}

startbtn.addEventListener("click", startGame);
resetbtn.addEventListener("click", resetGame);
drawGame();



function startGame()
{
    if(!running)
    {
        window.addEventListener("keydown", changeDirection);
    
        ball.velocityY = generateRandomDecimalInRangeFormatted(-ball.velocityX, ball.velocityX - 1, 2);
    
        timer = setInterval(move , 30);
    }
}

function move()
{
    changeBallDirection();
    
    move_ball();

    checkWin();

    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

    drawGame();


    function move_ball()
    {   
         ball.x += ball.velocityX;
         ball.y -= ball.velocityY;
    }
}

function drawGame()
{

    drawBoard();

    drawPaddle(paddle1);
    drawPaddle(paddle2);

    drawBall();

    function drawBoard()
    {
        ctx.fillStyle = boardBackgroundColor;
        ctx.fillRect(0, 0, gameBoard.width, gameBoard.height); 
    }

    function drawPaddle( paddle)
    {
        ctx.fillStyle = paddle.color;
        ctx.strokeStyle = borderColor;
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    function drawBall()
    {
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y,ball.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

function checkWin()
{
    if(ball.x - ball.radius <= 0 && (ball.y <= paddle2.y || ball.y >= paddle2.y + 112.5))
    {
        p1Score++;
        scoreText.textContent = `${p2Score} : ${p1Score}`;
        paddle1.y = 350;
        paddle2.y = 0;

        ball.x = ball.y = 225;
        ball.velocityX = 5;
    }else if(ball.x + ball.radius >= 450  && (ball.y <= paddle1.y || ball.y >= paddle1.y + 112.5))
    {
        p2Score++;
        scoreText.textContent = `${p2Score} : ${p1Score}`;
        paddle1.y = 350;
        paddle2.y = 0;

        ball.x = ball.y = 225;
        ball.velocityX = -5;
    }
}

function changeDirection(event)
{
    const keydown = event.keyCode;

    const paddle1Up = 38;
    const paddle1Down = 40;

    const paddle2Up = 87;
    const paddle2Down = 83;

    if(keydown == paddle1Up && paddle1.y > 0)
        paddle1.y -= paddleSpeed;
    else if(keydown == paddle1Down && paddle1.y <350)
        paddle1.y +=  paddleSpeed;
    else if(keydown == paddle2Up && paddle2.y > 0)
        paddle2.y -=  paddleSpeed;
    else if(keydown == paddle2Down && paddle2.y <350)
        paddle2.y +=  paddleSpeed;
}

function changeBallDirection()
{
    if(ball.x + ball.radius  >= paddle1.x)
    {
        if(ball.y >= (paddle1.y - ball.radius) && ball.y <= paddle1.y + 50)
        {
            ball.velocityX *= -1;
            ball.velocityY = generateRandomDecimalInRangeFormatted(-ball.velocityX, ball.velocityX - 1 , 2);
            (ball.velocityX <= 15)? ball.velocityX += -1 : ball.velocityX;
        }else if(ball.y >= (paddle1.y + 50) && ball.y <= paddle1.y + 112.5)
        {
            ball.velocityX *= -1;
            ball.velocityY = generateRandomDecimalInRangeFormatted(-ball.velocityX, ball.velocityX , 2);
            (ball.velocityX <= 15)? ball.velocityX += -1 : ball.velocityX;
        }
    }
    else if((ball.x - ball.radius) <= 25)
    {
        if(ball.y >= (paddle2.y - ball.radius) && ball.y <= paddle2.y + 50)
        {
            ball.velocityX *= -1;
            ball.velocityY = generateRandomDecimalInRangeFormatted(-ball.velocityX, ball.velocityX - 1 , 2);
            (ball.velocityX <= 15)? ball.velocityX += 1 : ball.velocityX;
        }else 
        if(ball.y >= (paddle2.y + 50) && ball.y <= paddle2.y + 112.5)
        {
            ball.velocityX *= -1;
            ball.velocityY = generateRandomDecimalInRangeFormatted(-ball.velocityX, ball.velocityX , 2);
            (ball.velocityX <= 15)? ball.velocityX += 1 : ball.velocityX;
        }

    }else if(ball.y + ball.radius >= 450 || ball.y - ball.radius <= 0)
    {
        ball.velocityY *= -1;
    }
}

function generateRandomDecimalInRangeFormatted(min, max, places) {
    let value = (Math.random() * (max - min + 1)) + min;
    return Number.parseFloat(value).toFixed(places);
}

function resetGame()
{
    clearInterval(timer);
    running = false;
    
    p1Score = 0;
    p2Score = 0;
    scoreText.textContent = `${p2Score} : ${p1Score}`;

    paddle1.y = 350;
    paddle2.y = 0;

    ball.x = ball.y = 225;
    ball.velocityX = 5;

    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

    drawGame();
}