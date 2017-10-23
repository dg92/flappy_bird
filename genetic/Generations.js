function Generations() {
  this.generations = [];
}

Generations.prototype.firstGeneration = function(input, hiddens, output) {
  var out = [];
  for(var i = 0; i< options.population; i++) {
    var nn = new Network();
    nn.perceptronGeneration(options.network[0], options.network[1], options.network[2]);
    out.push(nn.getSave());
  }
  this.generations.push(new Generation());
  return out;
}

Generations.prototype.nextGeneration = function() {
  if(this.generations.length === 0) {
    return false;
  }
  var gen = this.generations[this.generations.length-1].generateNextGeneration(options);
  this.generations.push(new Generation());
  return gen;
}

Generations.prototype.addGenome = function(genome){
      // Can't add to a Generation if there are no Generations.
  if(this.generations.length == 0) return false;

     // FIXME addGenome returns void.
  return this.generations[this.generations.length - 1].addGenome(genome);
}
