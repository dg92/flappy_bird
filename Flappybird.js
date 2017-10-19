var bird;
var gravity = 0.3;
var pipes = [];
var speed = 1;
var score;
var lastScore;
var highestScore;
var neuroEvolution;
var generations = [];

function getHighestScore() {
  let storedScore = localStorage.getItem("score");
  highestScore = storedScore === null ? 0 : parseInt(storedScore, 10);
}

function setHighestScore() {
  if(score > highestScore) {
    localStorage.setItem("score", score);
  } else {
    localStorage.setItem("score", highestScore);
  }
}

function setup() {
  createCanvas(800, 500);
  this.getHighestScore();
  bird = new Bird(400, height/2, 10);
  neuroEvolution = new NeuroEvolution({
    population: 50,
    network: [2, [3], 1]
  });
  gen = neuroEvolution.nextGeneration();
  score = 0;
  textSize(40);
  pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  textAlign(CENTER);
}

function draw() {
  background(51);
  bird.update();
  bird.draw();
  if(bird.collideWithWall()) {
    gen = neuroEvolution.nextGeneration();
    endGame();
  }

  if(frameCount % 120 === 0) {
    pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  }
  
  for(var i = 0; i < pipes.length; i++) {
    pipes[i].update();
    pipes[i].draw();
    if(bird.collideWithPipe(pipes[i])) {
      this.endGame();
    } else if(!pipes[i].passed) {
        if(pipes[i].isPassed(bird.x)) {
          score++;
        }
    }
 }
  noStroke();
  textSize(20);
  fill(255, 255, 255);
  text("High Score : " + highestScore, 80, 25);
  fill(255, 255, 255);
  text("Score : " + score, 50, height - 20);
}

function mousePressed() {
  bird.hop(-8);
}

function keyPressed() {
  if(keyCode === 32 || keyCode === 38) {
    bird.hop(-8);
  }
  if(keyCode === 82) {
    this.setHighestScore();
    window.location.reload();
  }
}

function endGame() {
  noLoop();
  noStroke();
  text('You lose !', width/2, height/2);
  text('Press r to restart !', width/2, height/2+30); 
}