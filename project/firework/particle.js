// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

function Particle(x, y, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.acc = createVector(0, 0);
  
  if (this.firework) {
    this.vel = createVector(0, random(-5, -2));
    this.acc = createVector(0, random(-11,-12));
    this.r = random(125, 255);  
    this.g = random(125, 255); 
    this.b = random(125, 255);  
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 8));
    this.acc = createVector(0, 0);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);

  }
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(random(0.98,0.95));
      this.acc.mult(random(0.2,0.1));

      this.lifespan -= 5;
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    // colorMode(HSB);
    
    if (this.firework) {
        strokeWeight(4);
        stroke(this.r,this.g,this.b);
        point(this.pos.x, this.pos.y);

    } 
    else {
      push();
      strokeWeight(3);
      if(random(1)<0.8){
        stroke(this.r,this.g,this.b,this.lifespan);
      }
      point(this.pos.x, this.pos.y);
      pop();
    }
    
    
}
}