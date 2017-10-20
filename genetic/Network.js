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
  this.layers.push(outputLayer);
}

Network.prototype.getSave = function() {
  var datas = {
    neurons: [], // no. of neurons in each layer
    weights: []
  };
    for(var i in this.layers){
      datas.neurons.push(this.layers[i].neurons.length);
      for(var j in this.layers[i].neurons){
        for(var k in this.layers[i].neurons[j].weights){
            // push all input weights of each Neuron of each Layer into a flat
            // array.
          datas.weights.push(this.layers[i].neurons[j].weights[k]);
        }
      }
    }
    return datas;
}

Network.prototype.setSave = function(save) {
  var previousNeurons = 0;
  var index = 0;
  var indexWeights = 0;
  this.layers = [];
  for(var i in save.neurons){
    // Create and populate layers.
    var layer = new Layer(index);
    layer.populate(save.neurons[i], previousNeurons);
    for(var j in layer.neurons){
      for(var k in layer.neurons[j].weights){
          // Apply neurons weights to each Neuron.
        layer.neurons[j].weights[k] = save.weights[indexWeights];
        indexWeights++; // Increment index of flat array.
      }
    }
    previousNeurons = save.neurons[i];
    index++;
    this.layers.push(layer);
  }
}

Network.prototype.compute = function(inputs) {
  // Set the value of each Neuron in the input layer.
    for(var i in inputs){
      if(this.layers[0] && this.layers[0].neurons[i]){
        this.layers[0].neurons[i].value = inputs[i];
      }
    }
    var prevLayer = this.layers[0]; // Previous layer is input layer.
    for(var i = 1; i < this.layers.length; i++){
      for(var j in this.layers[i].neurons){
        // For each Neuron in each layer.
        var sum = 0;
        for(var k in prevLayer.neurons){
            // Every Neuron in the previous layer is an input to each Neuron in
            // the next layer.
          sum += prevLayer.neurons[k].value
                    * this.layers[i].neurons[j].weights[k];
        }
        // Compute the activation of the Neuron.
        this.layers[i].neurons[j].value = options.activation(sum);
      }
      prevLayer = this.layers[i];
    }

    // All outputs of the Network.
    var out = [];
    var lastLayer = this.layers[this.layers.length - 1];
    for(var i in lastLayer.neurons){
      out.push(lastLayer.neurons[i].value);
    }
    return out;
}