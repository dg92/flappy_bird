function Network() {
  this.layers = [];
}

Network.prototype.perceptronGeneration = function(nNeuroInInput, nNeuronPerHidden, nNeuronInOutput) {
  var index = 0;
  var previousNeurons = 0;
  var inputLayer = new Layer(index);
  inputLayer.populate(nNeuroInInput, previousNeurons);
  previousNeurons = nNeuroInInput;
  this.layers.push(inputLayer);
  index++;
  for(var i in nNeuronPerHidden) {
    var hiddenLayer = new Layer(index);
    hiddenLayer.populate(nNeuronPerHidden[i], previousNeurons);
    previousNeurons = nNeuronPerHidden[i];
    this.layers.push(hiddenLayer);
    index++;
  }
  var outputLayer = new Layer(index);
  outputLayer.populate(nNeuronInOutput, previousNeurons);
  this.layers.push(inputLayer);
}

Network.prototype.getSave = function() {
  var datas = {
    neurons: [], // no. of neurons in each layer
    weights: []
  };
  const temp = [];
  for(var i in this.layers) {
    datas.neurons.push(this.layers[i].neurons.length)
    this.layers[i].neurons.map((itms, i) => {
      temp.concat(itms.weights);
    });
    datas.weights.concat(temp.reduce((oneD, twoD) => oneD.concat(twoD), []));
  }
  return datas;
}

Network.prototype.setSave = function() {

}

Network.prototype.compute = function() {

}