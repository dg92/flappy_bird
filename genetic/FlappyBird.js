var birds= [];
var pipes = [];
var gravity = 0.2;
var speed = 4;
var score;
var lastScore;
var highestScore;
var neuroEvolution;
var gen = [];
var generation = 0;
var alives = 0;
var options = {
    network:[1, [1], 1],    // Perceptron network structure (1 hidden
          // layer).
    population:50,          // Population by generation.
    elitism:0.2,            // Best networks kepts unchanged for the next
                // generation (rate).
    randomBehaviour:0.2,    // New random networks for the next generation
                // (rate).
    mutationRate:0.1,       // Mutation rate on the weights of synapses.
    mutationRange:0.5,      // Interval of the mutation changes on the
                // synapse weight.
    historic:0,             // Latest generations saved.
    lowHistoric:false,      // Only save score (not the network).
    scoreSort:-1,           // Sort order (-1 = desc, 1 = asc).
    nbChild:1     ,
    activation: function(a){
      ap = (-a)/1;
      return (1/(1 + Math.exp(ap)))
    }
  };

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
  this.start();
  textSize(40);
  textAlign(CENTER);
}

function start() {
  birds = [];
  pipes = [];
  score = 0;
  neuroEvolution = new NeuroEvolution({
    population: 50,
    network: [2, [2], 1]
  });
  gen = neuroEvolution.nextGeneration();
  for(var i in this.gen) {
    birds.push(new  Bird(400, height/2, 10))
  }
  pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  generation++;
  alives = this.birds.length;
}

function draw() {
  background(51);
  if(frameCount % 120 === 0) {
    pipes.push(new Pipe(width, random(height/2)+height/4, 180, color(score%255, random(255), random(255))));
  }
  var nextHole = 0;
  if(birds.length > 0){
    for(var i = 0; i < pipes.length; i+=2){
      if(pipes[i].x + pipes[i].w > birds[0].x){
        nextHole = pipes[i].hole;
        break;
      }
    }
  }
  for(var i in birds) {
    birds[i].update();
    birds[i].draw();
    if(birds[i].alive) {
      var inputs = [birds[i].y/height, nextHole];
      var res = gen[i].compute(inputs);
      if(res > 0.6) {
        birds[i].hop(-6);
      }
      for(var j = 0; j < pipes.length; j++) {
        if(!pipes[j].passed) {
          if(pipes[j].isPassed(birds[i].x)) {
            score++;
          }
        }
        if(birds[i].dead(pipes[j])) {
          birds[i].alive = false;
          alives--;
          neuroEvolution.networkScore(gen[i], score);
          if(this.isItEnd()) {
            this.start();
          }
        }
      }
    }
  }
  for(var i = 0; i < pipes.length; i++) {
    pipes[i].update();
    pipes[i].draw();
  }
  noStroke();
  textSize(20);
  fill(255, 255, 255);
  text("High Score : " + highestScore, 80, 25);
  text("Generation : " + generation, 75, 50);
  fill(255, 255, 255);
  text("Score : " + score, 50, height - 20);
}

isItEnd = function(){
  for(var i in this.birds){
    if(this.birds[i].alive){
      return false;
    }
  }
  return true;
}
