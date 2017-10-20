function Generation() {
  this.genomes = [];
}

Generation.prototype.addGenome = function(genome) {
      for(var i = 0; i < this.genomes.length; i++){
      if(options.scoreSort < 0){
        if(genome.score > this.genomes[i].score){
          break;
        }
      }else{
        if(genome.score < this.genomes[i].score){
          break;
        }
      }
    }
    this.genomes.splice(i, 0, genome);
}

// combine mutation and crossover
Generation.prototype.breed = function(g1, g2, nChilds) {
  var datas = [];
  for(var nb = 0; nb < nbChilds; nb++){
    // Deep clone of genome 1.
    var data = JSON.parse(JSON.stringify(g1));
    for(var i in g2.network.weights){
      // Genetic crossover
      // 0.5 is the crossover factor.
      // FIXME Really should be a predefined constant.
      if(Math.random() <= 0.5){
        data.network.weights[i] = g2.network.weights[i];
      }
    }
    // Perform mutation on some weights.
    for(var i in data.network.weights){
      if(Math.random() <= options.mutationRate){
        data.network.weights[i] += Math.random()
          * options.mutationRange
            * 2
            - options.mutationRange;
      }
    }
    datas.push(data);
  }
  return datas;
}

Generation.prototype.generateNextGeneration = function() {
  var nexts= [];
  // get elite class from the previous generation
  for(var i = 0; i < Math.round(options.elitism* options.population); i++){
    if(nexts.length < options.population){
      nexts.push(JSON.parse(JSON.stringify(this.genomes[i].network)));
    }
  }
  // form a  new network taking reference of old network and add random weight
  for(var i = 0; i < Math.round(options.randomBehaviour* options.population); i++){
      var n = JSON.parse(JSON.stringify(this.genomes[0].network));
      for(var k in n.weights){
        n.weights[k] = Math.random() * 2 - 1;
      }
      if(nexts.length < options.population){
        nexts.push(n);
      }
    }
    // 
    var max = 0;
    while(true){
      for(var i = 0; i < max; i++){
        // Create the children and push them to the nexts array.
        var childs = this.breed(this.genomes[i], this.genomes[max],(options.nbChild > 0 ? options.nbChild : 1), options);
        for(var c in childs){
          nexts.push(childs[c].network);
          if(nexts.length >= options.population){
            // Return once number of children is equal to the
            // population by generatiion value.
            return nexts;
          }
        }
      }
    max++;
    if(max >= this.genomes.length - 1){
      max = 0;
    }
  }
}