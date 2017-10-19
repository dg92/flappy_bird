// every neuron has value and set of weights for them to compute the fitness function
function Neuron() {
  this.value = 0;
  this.weights = [];
}

Neuron.prototype.populate = function(nInputs) {
  this.weights = [];
  for(var i=0; i<nInputs; i++) {
    this.weights.push(Math.random() * 2 - 1);
  }
}