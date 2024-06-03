function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  colorMode(HSB);
  frameRate(fps);

  stroke("red");
  strokeWeight(5)
  point(100, 100)


  pc1 =  new PartialCircle(
    x_center=100, 
    y_center=100, 
    radius=25,
    current_angle=135,
    stop_angle=45,
    direction="CCW"
  );

  

}

class PartialCircle {
  constructor(x_center, y_center, radius, current_angle, stop_angle, direction) {
    this.x = x_center;
    this.y = y_center;
    this.r = radius;
    this.direction = direction;
    this.current_angle = current_angle;
    this.stop_angle = stop_angle;
    this.rpm = 20;
    this.doneDrawing = false;

    // convert from rpm and fps to the increment angle of each frame
    this.angle_i = 360 * ((this.rpm / 60) / fps);
  }

  move() {
    //console.log("current angle:", this.current_angle, "stop angle:", this.stop_angle)
    if (this.direction == "CCW") {
      if (this.current_angle > this.stop_angle) {
        this.current_angle = this.current_angle - this.angle_i
      } else {
        this.doneDrawing=true;
        let newRadius = 75;

        //stroke("green")
        //strokeWeight(3)
        //line(100,100,pc1.x + (cos(pc1.current_angle) * pc1.r) + newRadius,pc1.y + (sin(pc1.current_angle) * pc1.r) + newRadius)

        pc2 = new PartialCircle(
          // last point of previous circle + new radius
          x_center=pc1.x + (cos(pc1.current_angle) * pc1.r) + newRadius-22, // figure out this -22?
          y_center=pc1.y + (sin(pc1.current_angle) * pc1.r) + newRadius-22, 
          radius=newRadius,
          current_angle=45+180,
          stop_angle=45,
          direction="CW"
        );
      
      }
    } else {
      if (this.current_angle - this.stop_angle < 360) {
        this.current_angle = this.current_angle + this.angle_i
      } else {
        this.doneDrawing=true;
      }
    }
  }

  display() {
    stroke("purple");
    strokeWeight(10)
    point(this.x + (cos(this.current_angle) * this.r), this.y + (sin(this.current_angle) * this.r))
  }
    
}

function draw() {

  if (!pc1.doneDrawing) {
    pc1.display();
    pc1.move();
  } else {
    console.log('drawing next!')
    
  stroke("yellow")
  strokeWeight(5)
  point(pc1.x + (cos(pc1.current_angle) * pc1.r),pc1.y + (sin(pc1.current_angle) * pc1.r))


    pc2.display();
    pc2.move();
  }
}

let fps = 60;
let matrix = [];
let pc1;

let pc2;
  

