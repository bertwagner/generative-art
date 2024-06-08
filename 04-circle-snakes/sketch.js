function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white")
  angleMode(DEGREES)
  colorMode(HSB);
  frameRate(fps);


  stroke("black")
  strokeWeight(2)
  fill("black")
  rect(windowMargin,windowMargin,windowWidth-windowMargin-windowMargin, windowHeight-windowMargin-windowMargin)


  pc =  new PartialCircle(
    x_center=windowWidth/2,
    y_center=windowHeight/2,
    radius=25,
    start_angle=45,
    stop_angle=220,
    direction="CCW"
  );
}

function draw() {
  pc.move();
  pc.display();
}

function mouseClicked() {
  DEBUG && pc.generate_new_circle()
}

class PartialCircle {
  constructor(x_center, y_center, radius, start_angle, stop_angle, direction) {
    this.x = x_center;
    this.y = y_center;
    this.r = radius;
    this.direction = direction;
    this.rpm = 20;
    this.redirected_circle=false;

    // convert from rpm and fps to the increment angle of each frame
    this.angle_i = 360 * ((this.rpm / 60) / fps);

    this.start_angle = start_angle;
    this.current_angle = start_angle;
    this.stop_angle = stop_angle;
    this.degrees_remaining = this.calculate_degrees();
    this.color_direction_factor = 1;

    if (DEBUG) {
      //draw the initial center point
      stroke("red");
      strokeWeight(4)
      point(this.x, this.y)
    }

  }

  generate_new_circle() {
    let newRadius = random(10,100);
    this.redirected_circle=false;

    // draw line from old point to new point
    DEBUG && stroke("green");
    DEBUG && strokeWeight(2);

    let current_angle_new = (this.stop_angle+180) %360;

    let stop_angle_new = random(0,360)
    
    //if the last circle is within the window margin, make sure to generate the new circle so it angles inward
    if (this.x < 0 + windowMargin + newRadius) {
      DEBUG && console.log('in 1st margin')
      stop_angle_new = 0;
    }
    if (this.y < 0 + windowMargin+ newRadius) {
      DEBUG && console.log('in 2nd margin')
      stop_angle_new = 90;
    }
    if (this.x > windowWidth-windowMargin- newRadius) {
      DEBUG && console.log('in 3rd margin')
      stop_angle_new = 180;
    }
    if (this.y > windowHeight-windowMargin- newRadius) {
      DEBUG && console.log('in 4th margin')
      stop_angle_new = 270;
    }
    
    let direction_new = (this.direction == "CW" ? "CCW" : "CW");
    let x_new = this.x + (cos(this.current_angle) * this.r) + (cos(this.current_angle) * newRadius);
    let y_new = this.y + (sin(this.current_angle) * this.r) + (sin(this.current_angle) * newRadius);



    // draw a line from the old circle center to the new circle center
    DEBUG && line(this.x,this.y, x_new,y_new)
    console.log(this.redirected_circle)
    

    this.x=x_new;
    this.y=y_new;
    this.r=newRadius;
    this.start_angle=current_angle_new;
    this.current_angle=this.start_angle;
    this.stop_angle= stop_angle_new;
    this.direction=direction_new;
    this.degrees_remaining = this.calculate_degrees();

    if (DEBUG) {
      console.log("x:",this.x, "y:",this.y,"r:",this.r,"start angle:",this.start_angle,"current_angle:",this.current_angle, "stop angle:",this.stop_angle)
    }


    if (DEBUG) {
      //draw new circle center
      stroke("red")
      strokeWeight(4)
      point(this.x,this.y)
    }
  }

  calculate_degrees() {
    let dr = undefined;
    if (this.direction == "CCW") {

      if (this.start_angle >= this.stop_angle) {
        dr = this.start_angle - this.stop_angle;
      } else {
        dr = (360-this.stop_angle) + this.start_angle;
      }
    }

    if (this.direction == "CW") {
      if (this.stop_angle >= this.start_angle) {
        dr = this.stop_angle - this.start_angle;
      } else {
        dr = (360-this.start_angle) + this.stop_angle;
      }
    }

    return dr;
  }

  move() {
    // set whether angle_i should be added or subtracted
    let direction_factor = (this.direction == "CCW") ? 1 : -1;


    if (this.degrees_remaining > 0) {
      // adjust the angle
      this.degrees_remaining = this.degrees_remaining - this.angle_i;
      this.current_angle = this.current_angle - (this.angle_i * direction_factor);
    } else {
      !DEBUG && this.generate_new_circle();
    }

    if (this.color_direction_factor==1 && i > (254*color_transition_factor)) {

      this.color_direction_factor=-1;
      DEBUG && console.log('switching color to neg',this.color_direction_factor,i)
    }
    if (this.color_direction_factor == -1 && i < 1) {
      this.color_direction_factor=1;
      DEBUG && console.log('switching color to pos',this.color_direction_factor,i)
    }

    i=i+this.color_direction_factor;
  }

  display() {
    let c = color(i/color_transition_factor,100,100)
    stroke(c);
    strokeWeight(4)
    let x = this.x + (cos(this.current_angle) * this.r)
    let y = this.y + (sin(this.current_angle) * this.r)
    point(x,y)

    //if outside of margin, stop drawing this circle
    if (!this.redirected_circle && (x < 0 + windowMargin || y < 0 + windowMargin || x > windowWidth-windowMargin || y > windowHeight-windowMargin)) {
      console.log('outside of margin!')
      //this.degrees_remaining = 0;
      //this.stop_angle = this.current_angle;
      let last_angle=this.current_angle + 180
      this.generate_new_circle()
      this.current_angle = last_angle
      this.redirected_circle=true;

      if (DEBUG) {
        console.log("x:",this.x, "y:",this.y,"r:",this.r,"start angle:",this.start_angle,"current_angle:",this.current_angle, "stop angle:",this.stop_angle)
      }
    }


  }

  

}

let fps = 120;
let pc;
let windowMargin = 300;

let i = 0;
let color_transition_factor=10;
let DEBUG=true;