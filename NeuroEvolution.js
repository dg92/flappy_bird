function NeuroEvolution(data) {
  this.population = data.population;
  this.network = data.network;
  this.generations = new Generations();
}

NeuroEvolution.prototype.nextGeneration = function () {
  var networks = [];
  if(this.generations.generations.length === 0) {
    networks = this.generations.firstGeneration();
  } else {
  }
}