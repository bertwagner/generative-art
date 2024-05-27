function setup() {

 createCanvas(800,800);
 
 //angleMode(DEGREES)
 frameRate(30);


 
}


function draw() {
  background("grey");

  fill("yellow")
  square(300,300,200)

  fill("red")
  circle(350,450,40)
  fill("red")
  circle(451,450,40)

  fill("black")
  ellipse(400,475,50,20)

  fill("black")
  ellipse(360,375,30,50)
  fill("black")
  ellipse(440,375,30,50)

  fill("white")
  circle(355,360,10)
  fill("white")
  circle(445,360,10)

  fill("yellow")
  rotate(QUARTER_PI)
  ellipse(700,-200,20,100)
  pop()
}