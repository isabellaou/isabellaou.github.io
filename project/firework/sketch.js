var fireworks = [];
var gravity;

function setup() {
    colorMode(RGB);
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    stroke(255);
    strokeWeight(4);
    
    gravity = createVector(0,0.2);

}

function draw() {
    background(0,50);
    
    if (random(1) < 0.08) {
        fireworks.push(new Firework());
      }
      
      for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
      }

}