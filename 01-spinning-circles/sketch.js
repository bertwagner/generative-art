function setup() {

 createCanvas(800,800);
 
 angleMode(DEGREES)
 frameRate(30);
 d=.25
 i=0;

 matrix=[];
 
for (var k=100; k<height; k+=200) {
  for (var j=100; j<width; j+=200) {
    matrix.push([j,k])
  }
 }

 
}

function scribeCircle(center_x,center_y,diameter,strokeSize,strokeColor,p) {
  noStroke()
  fill(strokeColor)
  circle(center_x+(cos(p)*(diameter/2)),center_y+(sin(p)*(diameter/2)),strokeSize)
}

function draw() {
  background("grey");

  
  // draw grey circles
  for (var m=0; m<matrix.length; m++) {
    // strokeColor("grey");
    // strokeSize(3);
    var grey = color(255,255,255)
    grey.setAlpha(40)
    fill(grey)
    circle(matrix[m][0],matrix[m][1],50);
   }

   //draw each orbiting circle and it's ghosted trail
   for (var m=0; m<matrix.length; m++) {
    let c=color("red")


    c.setAlpha(255*(1/3));
    scribeCircle(matrix[m][0],matrix[m][1],50,16,c,(i-(d*128)));

    c.setAlpha(255*(2/3));
    scribeCircle(matrix[m][0],matrix[m][1],50,18,c,(i-d*64));

    c.setAlpha(255);
    scribeCircle(matrix[m][0],matrix[m][1],50,20,c,i);

    i=i+d
  }
}