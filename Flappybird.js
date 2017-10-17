var bird;
var gravity = 0.3;
var pipes = [];
var speed = 1;
var score;
function setup() {
  createCanvas(500, 500);
  bird = new Bird(50, height/2, 10);
  score = 0;
  textSize(40);

  pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  textAlign(CENTER);
}

function draw() {
  background(51);
  bird.update();
  bird.draw();
 
  if(frameCount % 120 === 0) {
    pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  }
  
  for(var i = 0; i < pipes.length; i++) {
    pipes[i].update();
    pipes[i].draw();
    if(bird.collideWith(pipes[i])) {
      noLoop();
      noStroke();
      textSize(50);
      text('You lose !', width/2, height/2);
      textSize(40);
      text('Press f5 to restart !', width/2, height/2+30);
    } else if(!pipes[i].passed) {
      console.log('here', pipes[i].isPassed(bird.x))
        if(pipes[i].isPassed(bird.x)) {
          score++;
        }
    }
 }
  noStroke();
  text(score, 50, height - 20)
}

function mousePressed() {
  bird.hop(-8);
}