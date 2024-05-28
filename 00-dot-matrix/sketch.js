function setup() {
  createCanvas(400, 400);
  frameRate(30);
  circle_i = (2*PI)/30

  x=width/20;
  y=height/20;
  circles=[]
  
  
  for (var i=1; i*x < width; i++) {
    for (var j=1; j*y < height; j++) {
      circles.push([i*x,j*y,5]);
    }
  }
  
  

}

function jitter(x,y) {
  jx=random(-2,2);
  jy=random(-2,2)
  
  return [jx+x,jy+y]
}


let c=0
function draw() {
  background("#000000");
  
  fill("red")
  circle(sin(PI),cos(.5*PI),20)
  
  
  for(var i=0; i<circles.length; i++) {
    [jx,jy] = jitter(circles[i][0],circles[i][1])
    fill("#ffffff")
    circle(jx,jy,circles[i][2])
  }
  
  
}