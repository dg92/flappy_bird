function NeuroEvolution(data) {
  this.population = data.population;
  this.network = data.network;
  this.generations = new Generations();
}

NeuroEvolution.prototype.nextGeneration = function() {
  var networks = [];
  if(this.generations.generations.length === 0) {
    networks = this.generations.firstGeneration();
  } else {
    networks = this.generations.nextGeneration();
  }
  // form networks from these network for current generation
  var nns = [];
  for(var i in networks) {
    var nn = new Network();
    nn.setSave(networks[i]);
    nns.push(nn);
  }
  if(options.lowHistoric) {
    if(this.generations.generations.length >= 2){
      var genomes = this.generations.generations[this.generations.generations.length - 2].genomes;
      for(var i in genomes){
        delete genomes[i].network;
      }
    }    
  }
  if(options.historic != -1){
    // Remove older generations.
    if(this.generations.generations.length > options.historic + 1){
      this.generations.generations.splice(0, this.generations.generations.length - (options.historic + 1));
    }
  }
  return nns;
}

NeuroEvolution.prototype.networkScore = function(network, score){
  this.generations.addGenome(new Genome(score, network.getSave()));
}