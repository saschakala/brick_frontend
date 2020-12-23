var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width
var height = canvas.height
var x = width/2;
var y = height-30;
var dx = 2;
var dy = -2;
var ballRadius = 7;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives = 3; 

var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 12;
let scoreDisplay = document.getElementById("score-display")


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function ballStop() {
    dy = 0
    dx = 0
}

function canvasReload() {
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                }
            }
        }
    }
}
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = "#FDA400";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#c04df9";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.fillStyle = "#f3ea5f";
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
                ctx.strokeStyle = "#ff48c4";
                ctx.lineWidth = 2;
                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius+2) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            // interval = setInterval(draw, 8) increase speed the more it gets hit
        }
        else {
            lives--;
            if(!lives) {
                ballStop()
                let finalScore = score
                let scoreElement = `
                    <h2>Score</h2>
                    <h3 id="score">${finalScore}</h3>`
                scoreDisplay.innerHTML += scoreElement
                // alert("GAME OVER");
                modalDisplay()
                // document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    x += dx;
    y += dy;

    if(rightPressed) {
        paddleX += 3;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 3;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

var interval = setInterval(draw, 10);





