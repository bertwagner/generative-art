let fps=60;
let matrix=[];

function setup() {
 createCanvas(400,400);
 angleMode(DEGREES)
 colorMode(HSB);
 frameRate(fps);
 
 for (var y=50; y<height; y+=100) {
   for (var x=50; x<width; x+=100) {
     matrix.push(new TraceCircle(x,y,random(30,70),random(5,15),random(0,360),random(5,20)));
   }
  }

}

class TraceCircle {
  constructor(x_center,y_center,diameter,strokeSize,strokeColor,rotationsPerMinute) {
    this.x=x_center;
    this.y=y_center;
    this.d=diameter;
    this.strokeSize=strokeSize;
    this.strokeColor=strokeColor;
    this.angle=random(0,360);
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
    fill(this.strokeColor,100,100);
    circle(this.x+(cos(this.angle)*(this.d/2)),this.y+(sin(this.angle)*(this.d/2)),this.strokeSize);
  }


}


function draw() {
  background("black");

  for (var m=0; m<matrix.length; m++) {
    matrix[m].move();
    matrix[m].displayBackground(10);
    matrix[m].display();
  }
  
}