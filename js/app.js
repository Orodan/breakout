(function () {

    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");

    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 0;
    var dy = 0;
    var ballRadius = 10;

    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;

    var rightPressed = false;
    var leftPressed = false;

    var brickRowCount    = 3;
    var brickColumnCount = 5;
    var brickWidth       = 75;
    var brickHeight      = 20;
    var brickPadding     = 10;
    var brickOffsetTop   = 30;
    var brickOffsetLeft  = 30;

    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x : 0, y : 0, status : 1 };
        }
    }

    var score = 0;

    function setUpKeyEvents () {

        // Key down
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 39)
                rightPressed = true;
            else if (e.keyCode === 37)
                leftPressed = true;
        }, false);

        // Key up
        document.addEventListener("keyup", function (e) {
            if (e.keyCode === 39)
                rightPressed = false;
            else if (e.keyCode === 37)
                leftPressed = false;
        }, false);

    }

    function collisionDetection () {

        for(var c = 0; c < brickColumnCount; c++) {
            for(var r = 0; r < brickRowCount; r++) {

                var b = bricks[c][r];
                if (x > b.x && x < b.x + brickWidth && y > b.y && b.y < b.y + brickHeight)
                    dy = -dy

            }
        }

    }

    function drawBall () {

        // Top limit
        if (y + dy < ballRadius) dy = -dy;
        else if (y + dy > canvas.height - ballRadius - paddleHeight) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                alert('Game over');
                document.location.reload();
            }
        }
        // Horizontal limit
        if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;

        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

    function drawPaddle () {

        if (rightPressed && paddleX < canvas.width - paddleWidth)
            paddleX += 7;
        else if (leftPressed && paddleX > 0)
            paddleX -= 7;

        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

    function drawBricks () {

        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {

                var b = bricks[c][r];

                // If the rectangle is not already hit
                if (b.status) {
                    // Collision detection
                    if (x + ballRadius > b.x && x - ballRadius < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;

                        if (score === brickRowCount * brickColumnCount) {
                            alert('Congratz, you won !');
                            document.location.reload();
                        }
                    }

                    // Calculate its position
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    b.x = brickX;
                    b.y = brickY;

                    // Draw it
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }

            }
        }

    }

    function drawScore () {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function draw () {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the ball
        drawBall();

        // Draw the paddle
        drawPaddle();

        // Draw bricks
        drawBricks();

        // Draw score
        drawScore();

        // Update the position of the ball
        x += dx;
        y += dy;
    }

    setUpKeyEvents();
    setInterval(draw, 10);

})();