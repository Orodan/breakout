var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var ballRadius = 10;

function drawBall () {

    // Vertical limit
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) dy = -dy;
    // Horizontal limit
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw () {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    drawBall();

    // Update the position of the ball
    x += dx;
    y += dy;
}

setInterval(draw, 10);