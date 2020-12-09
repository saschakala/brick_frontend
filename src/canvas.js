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
var interval = setInterval(draw, 10);

var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 7;
var brickOffsetTop = 10;
var brickOffsetLeft = 12;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBricks();
    drawBall();
    drawPaddle();

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
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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


