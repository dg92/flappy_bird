function Bird(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.alive = true;
  this.yV = 0;
}

Bird.prototype.update = function () {
  this.yV += gravity;

  this.y  += this.yV;
};

Bird.prototype.hop = function (force) {
  this.yV = 0;
  this.yV += force;
};

Bird.prototype.dead = function (pipes) {
  if(this.y > height || this.y  < 0) {
    return true;
  }
  for(var i in pipes) {
    console.log(pipes[i].x - this.x  <= this.r, pipes[i].x - this.x  >= -this.r )
    if(pipes[i].x - this.x  <= this.r && pipes[i].x - this.x  >= -this.r ) {
      var uH = pipes[i].hole - pipes[i].w/2;
      var lH = pipes[i].hole + pipes[i].w/2;
      console.log({uH, lH})
      console.log(this.y -this.r < uH, this.y+this.r > lH)
      return this.y -this.r < uH  || this.y+this.r > lH;
    }
    return false;
  }
};

Bird.prototype.draw = function () {
  stroke(40);
  strokeWeight(3);
  fill(255);
  ellipse(this.x, this.y, this.r *2);
};
