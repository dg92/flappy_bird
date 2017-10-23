function Bird(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.yV = 0;
  this.yM = 0;
}

Bird.prototype.update = function () {
  this.yV += gravity;

  this.y  += this.yV;
};

Bird.prototype.hop = function (force) {
  this.yV = 0;
  this.yV += force;
};

Bird.prototype.collideWithPipe = function (pipe) {
  if(pipe.x - this.x  <= this.r && pipe.x - this.x  >= -this.r ) {
    var uH = pipe.hole - pipe.w/2;
    var lH = pipe.hole + pipe.w/2;
    return this.y -this.r < uH  || this.y+this.r > lH;
  }
  return false;
};

Bird.prototype.collideWithWall = function () {
  return this.y > height || this.y  < 0;
};

Bird.prototype.draw = function () {
  stroke(40);
  strokeWeight(3);
  fill(255);
  ellipse(this.x, this.y, this.r *2);
};
