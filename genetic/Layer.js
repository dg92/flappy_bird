function Layer(index) {
  this.neurons = [];
  this.id = index;
}

// nNeurons are the number of neurons
// nInputs is the number of the input
Layer.prototype.populate = function(nNeurons, nInputs) {
  this.neurons = [];
  for(var i =0; i<nNeurons; i++) {
    var n = new Neuron();
    n.populate(nInputs);
    this.neurons.push(n);
  }
}