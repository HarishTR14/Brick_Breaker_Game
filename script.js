document.addEventListener("DOMContentLoaded", () => {
  const ball = document.querySelector(".ball");
  const hitter = document.querySelector(".hitter");
  const frame1 = document.querySelector(".frame1");
  const blocks = document.querySelectorAll(".block");
  const highScoreElement = document.querySelector(".highscore");
  const currentScoreElement = document.querySelector(".currentscore");
  let ballX = ball.offsetLeft;
  let ballY = ball.offsetTop;
  let ballDX = 2;
  let ballDY = 2;
  let hitterX = hitter.offsetLeft;
  let currentScore = 0;
  let highScore = 0;

  function updateScores() {
    currentScoreElement.textContent = currentScore;
    if (currentScore > highScore) {
      highScore = currentScore;
      highScoreElement.textContent = highScore;
    }
  }

  function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    if (ballX <= 0 || ballX >= frame1.clientWidth - ball.clientWidth) {
      ballDX = -ballDX;
    }
    if (ballY <= 0) {
      ballDY = -ballDY;
    }
    if (ballY >= frame1.clientHeight - ball.clientHeight) {
      gameOver();
    }

    if (
      ballY + ball.clientHeight >= hitter.offsetTop &&
      ballX + ball.clientWidth >= hitterX &&
      ballX <= hitterX + hitter.clientWidth
    ) {
      ballDY = -ballDY;
    }

    blocks.forEach((block) => {
      if (
        !block.classList.contains("hit") &&
        ballX + ball.clientWidth >= block.offsetLeft &&
        ballX <= block.offsetLeft + block.clientWidth &&
        ballY + ball.clientHeight >= block.offsetTop &&
        ballY <= block.offsetTop + block.clientHeight
      ) {
        ballDY = -ballDY;
        block.classList.add("hit");
        block.style.visibility = "hidden"; // Hide the block
        currentScore++;
        updateScores();

        // Check if all blocks are hit
        if (document.querySelectorAll(".block:not(.hit)").length === 0) {
          youWon();
        }
      }
    });

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    requestAnimationFrame(moveBall);
  }

  function moveHitter(e) {
    if (e.key === "ArrowLeft" && hitterX > 0) {
      hitterX -= 10;
    } else if (
      e.key === "ArrowRight" &&
      hitterX < frame1.clientWidth - hitter.clientWidth
    ) {
      hitterX += 10;
    }
    hitter.style.left = hitterX + "px";
  }

  function resetGame() {
    ballX = frame1.clientWidth / 2 - ball.clientWidth / 2;
    ballY = frame1.clientHeight / 2 - ball.clientHeight / 2;
    ballDX = 2;
    ballDY = 2;
    currentScore = 0;
    updateScores();
    blocks.forEach((block) => {
      block.classList.remove("hit");
      block.style.visibility = "visible";
    });
  }

  function gameOver() {
    alert("Game Over!");
    resetGame();
  }

  function youWon() {
    alert("You Won! want to play again?");
    resetGame();
  }

  document.addEventListener("keydown", moveHitter);
  requestAnimationFrame(moveBall);
});
