function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  colorMode(HSB);
  frameRate(fps);



  pc =  new PartialCircle(
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

    // convert from rpm and fps to the increment angle of each frame
    this.angle_i = 360 * ((this.rpm / 60) / fps);

    //draw the initial center point
    stroke("red");
    strokeWeight(4)
    point(this.x, this.y)
  }

  move() {
    //console.log("current angle:", this.current_angle, "stop angle:", this.stop_angle, "equal?", parseInt(this.current_angle % 360) == this.stop_angle)
    
    //continue drawing the current circle
    //if (this.current_angle % 360 != this.stop_angle) {
    if (
      (this.current_angle % 360 > this.stop_angle && this.direction == "CCW")
      || (this.current_angle % 360 < this.stop_angle && this.direction == "CW")
    ) {
      // set whether angle_i should be added or subtracted
      let direction_factor = (this.direction == "CCW") ? 1 : -1;

      // adjust the angle
      this.current_angle = (this.current_angle <= 0) ? this.current_angle+360 : this.current_angle - (this.angle_i * direction_factor);
    }
    //switch to creating a new circle
    else {
      i++
      if (i<maxi){

        if (i == 1) {

          let newRadius = 50;

          // TODO: this math here is broken. Need to create new green line where new point should be.
          // draw line from old point to new point
          stroke("green");
          strokeWeight(2);
          line(this.x,this.y, newRadius+(cos(this.current_angle-180) * this.r),newRadius+(sin(this.current_angle-180) * this.r))

          
          
          this.x=newRadius+(cos(this.current_angle+180) * this.r)
          this.y=newRadius+(sin(this.current_angle+180) * this.r)
          this.r=newRadius;
          this.current_angle=this.stop_angle+180;
          this.stop_angle= 340;
          this.direction=(this.direction == "CW" ? "CCW" : "CW");

          stroke("red")
          strokeWeight(4)
          point(this.x,this.y)
        }
        // if (i == 2) {
        //   //TODO: this current_angle is broken.
        //   let newRadius = 70;

        //   // draw line from old point to new point
        //   stroke("green");
        //   strokeWeight(2);
        //   line(this.x,this.y, this.x+newRadius+3,this.y+newRadius+3)


        //   this.x=this.x + newRadius+2+1;
        //   this.y=this.y + newRadius+2+1;
        //   this.r=newRadius;
        //   this.current_angle=this.stop_angle-90;
        //   this.stop_angle= 100;
        //   this.direction=(this.direction == "CW" ? "CCW" : "CW");

        //   stroke("red")
        //   strokeWeight(4)
        //   point(this.x,this.y)
        // }
        
      }
    }
  }

  display() {
    stroke("purple");
    strokeWeight(4)
    point(this.x + (cos(this.current_angle) * this.r), this.y + (sin(this.current_angle) * this.r))
  }

    
}

function draw() {
    pc.display();
    pc.move();
}

let fps = 60;
let pc;
let i = 0;
let maxi=2;
