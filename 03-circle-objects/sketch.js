let fps=60;
let tc;

function setup() {
 createCanvas(400,400);
 angleMode(DEGREES)
 frameRate(fps);

 tc = new TraceCircle(100,100,50,10,"red",15);
}

class TraceCircle {
  constructor(x_center,y_center,diameter,strokeSize,strokeColor,rotationsPerMinute) {
    this.x=x_center;
    this.y=y_center;
    this.d=diameter;
    this.strokeSize=strokeSize;
    this.strokeColor=strokeColor;
    this.angle=0;
    this.rpm=rotationsPerMinute;
    // convert from rpm and fps to the increment angle of each frame
    this.angle_i=360*((this.rpm/60)/fps);
  }

  move() {
    this.angle=this.angle+this.angle_i
  }

  displayBackground(color) {
    noStroke();
    fill(color);
    circle(this.x,this.y,this.d)
  }

  display() {
    noStroke();
    fill(this.strokeColor);
    circle(this.x+(cos(this.angle)*(this.d/2)),this.y+(sin(this.angle)*(this.d/2)),this.strokeSize);
  }


}


function draw() {
  background(128);

  tc.move();
  tc.displayBackground(60);
  tc.display();
}