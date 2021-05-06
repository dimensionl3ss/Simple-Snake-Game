//Game constant and variables
let inputDir = { x: 0, y: 0 }; // initaial
const foodSound = new Audio("/sounds/food.mp3");
const gameOver = new Audio("/sounds/gameover.mp3");
const moveSound = new Audio("/sounds/move.mp3");
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let score = 0;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide() {

    //if you bump into the wall
    if(snakeArr[0].x >= 30 || snakeArr[0].x <= 0  ||
            snakeArr[0].y >= 30 || snakeArr[0].y <= 0) {
                return true;
    }
    // if you bump into your self
    for (let i = 1; i < snakeArr.length; i++){  
       if( snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y ){
           return true;
       }
    }
    return false;
}

function gameEngine() {
  //part1: Updating the snake array
    
    if(isCollide()){
        gameOver.play();
        inputDir = {x:0, y:0};
        alert('Game Over. Press enter key to play again!');
        snakeArr= [{ x: 13, y: 15 }];
        score = 0;
        //musicSound.play();
        speed=5;
        scoreBox.innerHTML="Score: "+score;

    }
// if you have eaten the food increase the score and regenerate the food
    if(snakeArr[0].y === food.y  && snakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        if(score % 10 ===5) speed +=  1;
        if( score > hiscoreVal) {
            hiscoreVal= score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreVal));
            hiscoreBox.innerHTML='High Score: '+ hiscoreVal;
        }
        scoreBox.innerHTML = "Score: " +score;
        // add a snake-element to head of the snake in a direction in which he is moving
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        //update food element randomly
        food = {x: Math.floor((Math.random() * 25) + 2),y: Math.floor((Math.random() * 25) + 2)};
    }
// moving the snake
    for (let i = snakeArr.length -2; i>=0;  i--) {
        snakeArr[i+1] = {...snakeArr[i]};  // destructuring
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
  //part2: Render the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    //for each object in snake array
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic start here
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null) {
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
}
else {
    hiscoreVal = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: "+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game

  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        break;
    case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
        break;
    case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
        break;
    case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
        break;

    default:
      break;
  }
});
