let fps=60;
let matrix=[];

function setup() {
 createCanvas(windowWidth,windowHeight);
 angleMode(DEGREES)
 colorMode(HSB);
 frameRate(fps);

 let numberOfXCircles = 14;
 let numberOfYCircles = 10;
 let maxX = width/numberOfXCircles;
 let maxY = height/numberOfYCircles;
 let maxD = (maxX>maxY) ? maxX : maxY;

 
 for (var y=maxY/2; y<height; y+=maxY) {
   for (var x=maxX/2; x<width; x+=maxX) {
     matrix.push(new TraceCircle(x,y,random(maxD/8,maxD/2),random(maxD/32,maxD/8),random(0,360),random(5,20)));
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

  displayTrail(length) {
    for (var i=1; i<=length; i++) {
      noStroke();
      let c=color(this.strokeColor,100,100)
      // TODO: Get alpha trail working;
      c.setAlpha(50)
      fill(c);
      circle(this.x+(cos(this.angle-(this.angle_i*i))*(this.d/2)),this.y+(sin(this.angle-(this.angle_i*i) )*(this.d/2)),this.strokeSize*.9);
    }
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
    //matrix[m].displayTrail(15);
    matrix[m].display();
  }
  
}