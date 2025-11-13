let playerX = 50;
let playerY = 50;
let coinX = 200;
let coinY = 200;
let monsterX = 500;
let monsterY = 500;

let distX;
let distY;

let score = 0;
let highScore = localStorage.getItem("highscore");

let movementSpeed = 5;
let monsterMovementSpeed = 3;

let grass;
let pixelFont;

function preload() {
    grass = loadImage("img/grass.jpg");
    pixelFont = loadFont("fonts/retro.ttf");
}

function setup() {
    frameRate(60);
    createCanvas(1700, 900);
    rectMode(CENTER);
    imageMode(CENTER);
    textAlign(CENTER);
    textFont(pixelFont);
}

function draw() {
    drawGrass();
    drawPlayer();
    drawMonster();
    drawCoin();
    updateDist();
    displayScore();
    detectCheat();
    movePlayer();
    moveMonster();
    setBorder();

    restartGame();

    if (dist(playerX, playerY, monsterX, monsterY) <= 50) {
        restartGame();
        killPlayer();
    }
}

function drawPlayer() {
    //playerbody
    push();
    noStroke();
    fill("rgb(255, 43, 43)");
    rect(playerX, playerY, 50, 50);
    pop();

    //playereyes
    push();
    fill(0);
    stroke(255);
    strokeWeight(4);
    circle(playerX - 10, playerY - 10, 17);
    circle(playerX + 10, playerY - 10, 17);
    pop();
}

function drawMonster() {
    //monsterbody
    push();
    noStroke();
    fill("rgba(0, 4, 255, 1)");
    rect(monsterX, monsterY, 50, 50);
    pop();

    //monstereyes -> red
    push();
    fill(0);
    stroke("rgb(255, 0, 0)");
    strokeWeight(10);
    circle(monsterX - 10, monsterY - 10, 17);
    circle(monsterX + 10, monsterY - 10, 17);
    pop();
}

function movePlayer() {
    if(keyIsDown(87)) { //w
        playerY -= movementSpeed;
    }

    if (keyIsDown(65)) { //a
        playerX -= movementSpeed;
    }
    
    if (keyIsDown(83)) { //s
        playerY += movementSpeed;
    }

    if (keyIsDown(68)) { //d
        playerX += movementSpeed;
    }
}

function moveMonster() {
    let dx = playerX - monsterX;
    let dy = playerY - monsterY;

    let directory = createVector(dx, dy).normalize().mult(monsterMovementSpeed);

    monsterX += directory.x;
    monsterY += directory.y;
}

function updateDist() {
    distX = playerX - monsterX;
    distY = playerY - monsterY;
}

function setBorder() {
    if(playerX >= width - 25) { //for right border
        playerX = width - 25;
    }

    if(playerX <= (width - width) + 25) { //for left border
        playerX = (width - width) + 25;
    }

    if(playerY >= height - 25) { //for bottom border
        playerY = height - 25;
    }
    
    if(playerY <= (height - height) + 25) { //for upper border
        playerY = (height - height) + 25;
    }

    //set border for monster

    if (monsterX >= width - 25) { //for right border
        monsterX = width - 25;
    }

    if (monsterX <= (width - width) + 25) { //for left border
        monsterX = (width - width) + 25;
    }

    if (monsterY >= height - 25) { //for bottom border
        monsterY = height - 25;
    }

    if (monsterY <= (height - height) + 25) { //for upper border
        monsterY = (height - height) + 25;
    }
}

function killPlayer() {
    push();
    textSize(50);
    text("GAME OVER!", width / 2, height / 2);
    text(`Final Score: ${score}`, width / 2, height / 2 + 70);
    if (score > highScore) {
        highScore = score;
        saveHighscore();
        text(`New  Highscore: ${highScore}`, width / 2, height / 2 + 140);
    }
    pop();
    noLoop();
}

function drawGrass() {
    image(grass, width/2, height/2, 1700, 900);
    
}

function drawCoin() {
    push();
    fill("yellow");
    stroke("orange");
    strokeWeight(10);
    rect(coinX, coinY, 50, 50);
    pop();

    checkPlayerTouchCoin();
}

function checkPlayerTouchCoin() {
    if(dist(playerX, playerY, coinX, coinY) <= 50) {
        coinX = random(25, width - 25);
        coinY = random(25, height - 25);

        drawCoin();
        score++;

        monsterMovementSpeed += 0.1;
    }
}

function displayScore() {
    text(`Score: ${score}`, 50, 30);
    text(`Highscore: ${highScore}`, 200, 30);
}

function saveHighscore() {
    let highScoreSave = localStorage.setItem("highscore", highScore);
}

function detectCheat() {
    if(highScore > 1000) {
        localStorage.setItem("highscore", 0);
    }
}

function restartGame() {
    if(keyIsDown(82)) {
        location.reload();
    }
}