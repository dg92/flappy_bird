function Generations() {
  this.generations = [];
}

Generations.prototype.firstGeneration = function(input, hiddens, output, options) {
  var out = [];
  for(var i = 0; i<options.population; i++) {
    var nn = new Network();
    nn.perceptronGeneration(options.network[0], options.network[1], options.network[2]);
    out.push(nn.getSave());
  }
  this.generations.push(new Generation());
  return out;
}