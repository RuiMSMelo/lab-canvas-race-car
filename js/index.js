window.onload = () => {
  //hide the canvas until we press the start
  const canvas = document.querySelector('#canvas');
  canvas.style.display = "none";
  const bgImg = new Image();
  bgImg.src ='../images/road.png';
  const carImg = new Image();
  carImg.src ='../images/car.png';
  const ctx = canvas.getContext('2d');

  //const carX = 
  let isMovingLeft = false;
  let isMovingRight= false;
  const carSpeed = 2;
  let gameOver = false;
  let animateId;
  let carX = 224;
  let carY = 580;
  
  let score = 0;
  /*console.log(obstacleX)
  console.log(obstacleWidth)
  console.log(obstacleHeight)*/

  const startScreen = document.querySelector('.game-intro');
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    console.log("start game");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    animate();
  }

  const drawCar = () => {
    ctx.drawImage(carImg, carX, carY, 50, 100);
  }
  const drawObstacle = (obstacleX, obstacleY, obstacleWidth, obstacleHeight) => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    ctx.fill();
    ctx.closePath();
  }

  const spawnObstacles = () => {
    let obstacleX = Math.floor(Math.random()*400 + 25);
    let obstacleY = 10;
    let obstacleWidth = Math.floor(Math.random()*200 + 25);
    let obstacleHeight = 25;
    drawObstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  }

  setInterval(spawnObstacles, 2000);

  const animate = () => {
    //setInterval(spawnObstacles, 2000);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    drawCar();
    
    //let spawnObstaclesRandomNumber = Math.floor(Math.random()*1500+1000);
    //console.log(spawnObstaclesRandomNumber);


    if (gameOver) {
      cancelAnimationFrame(animateId);
    } else {
      animateId = requestAnimationFrame(animate);
    }
    if (isMovingLeft === true && carX > 0) {
      carX -= carSpeed
    }
    else if (isMovingRight === true && carX < 450) {
      carX += carSpeed;
    }
  }

  document.addEventListener('keydown', event => {
    console.log(event);
    if (event.key === 'ArrowLeft')
      isMovingLeft = true;
    else if (event.key === 'ArrowRight'){
      isMovingRight = true;
    }
  })
  document.addEventListener('keyup', event => {
    console.log(event);
    if (event.key === 'ArrowLeft')
      isMovingLeft = false;
    else if (event.key === 'ArrowRight'){
      isMovingRight = false;  
    }
  })
}