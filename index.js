var ball_x, ball_y, ball_dx, ball_dy, ball_radius;
var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
var brickRows = 4, brickColumns = 4, brickWidth = 75, brickHeight = 20, brickPadding = 20, brickOffsetLeft = 15, brickOffsetTop = 40;
var score, livecnt, maxlivecnt;


var bricks = [];

for (var c = 0; c < brickColumns; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRows; r++) {
    bricks[c][r] = { x: 0, y: 0, hidden: 0 };
  }
}

function setup() {
  createCanvas(400, 400);
  ball_x = width / 2;
  ball_y = height / 2;
  ball_radius = 12.5;
  ball_dx = 2;
  ball_dy = 2;

  paddle_width = 90;
  paddle_height = 15;
  paddle_x = (width / 2) - (paddle_width / 2);
  paddle_y = height - 25;
  paddle_dx = 3;

  score = 0;
  livecnt = 0;
  maxlivecnt = 3;

}

function createBricks() {
  for (var c = 0; c < brickColumns; c++) {
    for (var r = 0; r < brickRows; r++) {
      if (bricks[c][r].hidden === 0) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        fill("black");
        rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
      }
    }
  }
}

function draw() {
  clear();
  background(225);
  createBricks();

  circle(ball_x, ball_y, ball_radius * 2);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);

  ball_x += ball_dx;
  ball_y += ball_dy;

  if (ball_x >= width - ball_radius || ball_x <= ball_radius) {
    ball_dx = -ball_dx;
  }

  if (ball_y <= ball_radius) {
    ball_dy = -ball_dy;
  }

  if (ball_y >= height - ball_radius) {
    
    if (
      ball_x < paddle_x ||
      ball_x > paddle_x + paddle_width
    ) {
      livecnt++;
      if (livecnt >= maxlivecnt) { // Check if the ball reach the maximum number of livecnt
        gameOver();
        return;
      }
      ball_dy = -ball_dy;
    } else {
      ball_dy = -ball_dy;
    }
  }

 

  if (keyIsDown(LEFT_ARROW) && paddle_x > 0) {
    paddle_x -= paddle_dx;
  }

  if (keyIsDown(RIGHT_ARROW) && paddle_x + paddle_width < width) {
    paddle_x += paddle_dx;
  }

  if (
    ball_y + ball_radius >= paddle_y &&
    ball_x >= paddle_x &&
    ball_x <= paddle_x + paddle_width
  ) {
    ball_dy = -ball_dy;  // Reverse ball's  direction when it hits a brick
  }

  var remainingbrickcnt = 0;

  for (var c = 0; c < brickColumns; c++) {
    for (var r = 0; r < brickRows; r++) {
      if (bricks[c][r].hidden === 0) {
        remainingbrickcnt++;
        if (
          ball_x + ball_radius >= bricks[c][r].x &&
          ball_x - ball_radius <= brickWidth + bricks[c][r].x &&
          ball_y - ball_radius <= bricks[c][r].y &&
          ball_y + ball_radius >= bricks[c][r].y - brickHeight
         
        ) {
          bricks[c][r].hidden = 1;
          ball_dy = -ball_dy; // Reverse ball's  direction when it hits a brick
          score += 1; // Increment score by 1
        }
      }
    }
  }

  if (remainingbrickcnt === 0) {
    showScore();
    return;
  }

  textSize(20);
  fill('green');
  textAlign(CENTER); 
  text("Score: " + score, width / 7, 25); // Display the score 
  fill('red');
  text("Remaining Chance: " + (maxlivecnt - livecnt), width / 2, 25); // Display remaining Chance
}

function showScore() {
  fill("green");
  textSize(48);
  textAlign(CENTER); 
  text("Your Score: " + score, width / 2, height / 2);
  noLoop(); 
}

function gameOver() {
  fill("red");
  textSize(48);
  text("Game Over", width / 2, height / 2+30); //dispaly the Game Over
  noLoop(); // Stop the game loop
}


