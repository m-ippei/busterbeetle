var f;
var b;
var x=384;
var y=896;
var bee;
var start;
var goal;
var slider;
var count=0;
var avoided=0;
var max_avoided=0;
var hit = false;
var speed=0.01;
var max_speed=0.01;
var se;
var se2;
var PS=0;
var max_PS=0;

function preload(){
  se = loadSound("explosion.mp3");
  se2 = loadSound("success.mp3")
}

function setup() {
  createCanvas(768, 1024);


  f = loadImage("fighter.png");
  b = loadImage("bee.png");
  slider = createSlider(0, 768, 384);
  slider.position(0, 1034);
  slider.style('width', '768px');
  start = createVector(random(0,768),-128);
  bee = start.copy();
  goal = createVector(random(0,768),1152);
}

function draw() {
  background(220);
  if(count>1){
    se2.stop();
    se2.setVolume(0.5);
    se2.play()
    count=0
    avoided +=1;
    speed+=0.001;
    start = createVector(random(0,768),-128);
    bee = start.copy();
    goal = createVector(random(0,768),1152);
  }
  count += speed;
  bee = p5.Vector.lerp(start,goal,count)
  rect(bee.x,bee.y,128,128)
  image(b,bee.x,bee.y);
  x = slider.value()
  ellipse(x,y+64,64,64)
  image(f,x-64,y)
  text("avoided : "+avoided,100,200)
  text("max_avoided : "+max_avoided,100,220)
  hit = collideRectCircle(bee.x,bee.y,128,128,x,y+64,64,64);
  if(hit){
    se.stop();
    se.setVolume(0.5);
    se.play();
    if(max_avoided<avoided){
      max_avoided=avoided
    }
    if(max_PS<PS){
      max_PS=PS
    }
    speed = 0.01;
    avoided = 0;
  }
  var dis = p5.Vector.dist(start,goal)
  PS = dis/((1/speed)/60);
  text("bee_speed(px/second) : "+floor(PS),100,240);
  text("max_bee_speed(px/second) : "+floor(max_PS),100,260);
}
