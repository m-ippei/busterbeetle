var Scroll_Y = 0;


var i_fighter;
var i_fighter_afterImage;
var i_fighterA;
var i_fighterA_afterImage;
var bee;
var boss;
var bullet;
var ground;
var ground2;
var ring;

var v_fighter;
var v_n_bulletsSpeed;
var v_moveUD;
var v_moveLR;
var v_ring;

var arrPoints_fighter = [];

var d_fighter;

var bullets=[];

var e_radius = 1;

var is_cooldown=true;
var is_ringEffect=false;
var is_acceleration = false;

var timer_accelerarion = 0;
var timer_cooldown = 0;

//var a_cooldown_slider;

//var c_isFire;


function preload(){
  i_fighter = loadImage("fighter.png");
  i_fighter_afterImage = loadImage("fighter.png");
  i_fighterA = loadImage("fighterA.png");
  i_fighterA_afterImage = loadImage("fighterA.png");
  bee = loadImage("bee.png");
  bullet = loadImage("bullet.png");
  ground = loadImage("ground.png");
  ground2 = loadImage("ground2.png");
  ring = loadImage("ring.png");
}

function ui(){
  /*
  c_isFire = createCheckbox();
  c_isFire.changed(isAuto)
  c_isFire.position(710,555)
  */

  /*

  a_cooldown_slider = createSlider(60, 1200, 300);
  a_cooldown_slider.position(710, 40);
  a_cooldown_slider.style('width', '200px');
  */
}

function setup(){
  i_fighter_afterImage.filter('gray')
  i_fighterA_afterImage.filter('gray')

  createCanvas(538,716);
  v_fighter = createVector(224,626)

  for(let i=0;i<3;i++){
    append(arrPoints_fighter,v_fighter);
  }

  v_n_bulletsSpeed = createVector(0,0)

  v_moveUD = createVector(0,0);
  v_moveLR = createVector(0,0);
  v_ring = createVector(0,0);

  ui();
}

function default_loop() {

  image(ground,0,Scroll_Y);
  image(ground,0,Scroll_Y-716);

  Scroll_Y += 8;

  v_moveUD.set(0,6);
  v_moveLR.set(6,0);

  if(keyIsPressed){
    fighterMove()
    if(keyIsDown(32)){
      if(frameCount%10===0){
          fire();
      }
    }
  }

  v_n_bulletsSpeed.set(0,-18)
  for(let i=0;i<bullets.length;i++){
    image(bullet,bullets[i].x,bullets[i].y,10,45);
    bullets[i].add(v_n_bulletsSpeed);
  }

  image(i_fighter,v_fighter.x,v_fighter.y,90,90);
}

function acceleration_loop(){

  image(ground2,0,Scroll_Y);
  image(ground2,0,Scroll_Y-716);

  Scroll_Y+=0.5

  v_moveUD.set(0,16);
  v_moveLR.set(16,0);

  if(keyIsPressed){
    fighterMove();
    if(keyIsDown(32)){
      if(frameCount%3===0){
          fire();
      }
    }
  }

  v_n_bulletsSpeed.set(0,-0.2)
  for(let i=0;i<bullets.length;i++){
    image(bullet,bullets[i].x,bullets[i].y,10,45);
    bullets[i].add(v_n_bulletsSpeed);
  }

  for(let i=0;i<3;i++){
    image(i_fighter_afterImage,arrPoints_fighter[i].x,arrPoints_fighter[i].y,90,90)
  }

  if(frameCount%3===0){
    shorten(arrPoints_fighter);
    arrPoints_fighter.unshift(v_fighter.copy());
  }

  image(i_fighterA,v_fighter.x,v_fighter.y,90,90);
}

function draw(){
  background(255);
  imageMode(CORNER);
  if(Scroll_Y>716){Scroll_Y=0;}

  if(v_fighter.x>448){v_fighter.set(448,v_fighter.y)}
  if(v_fighter.x<0){v_fighter.set(0,v_fighter.y)}
  if(v_fighter.y>626){v_fighter.set(v_fighter.x,626)}
  if(v_fighter.y<0){v_fighter.set(v_fighter.x,0)}


  /*
  if(timer_cooldown<390){
    timer_cooldown += 1
  }else{
    is_cooldown = true;
  }

  if(timer_Accelerarion<90){
    timer_Accelerarion+=1
  }else{
    isAcceleration = false;
  }
  */

  if(is_acceleration){
    acceleration_loop();
  }else{
    default_loop();
  }

  if(is_ringEffect){
    e_radius +=150
  }

  if(e_radius>1600){
    e_radius = 1
    is_ringEffect = false
    is_acceleration = true;
  }

  if(is_acceleration){
    timer_accelerarion+=1
  }

  if(timer_accelerarion>90){
    is_acceleration = false;
    timer_accelerarion = 0;
    is_cooldown = false;
  }

  if(is_cooldown===false){
    timer_cooldown+=1
    fill(255)
    ellipse(v_fighter.x+44,v_fighter.y+48,10,10)
    fill(30,232,254,map(timer_cooldown,0,600,0,255))
    ellipse(v_fighter.x+44,v_fighter.y+48,10,10)
  }else{
    //noStroke()
    if(is_acceleration===false){
      fill(0,255,65)
      ellipse(v_fighter.x+44,v_fighter.y+48,10,10)
    }
    //stroke()
  }

  if(timer_cooldown>600){
    is_cooldown=true
    timer_cooldown = 0;
  }



  //image(boss,10,-100);




  image(bee,286,370,45,45);
  imageMode(CENTER);
  image(ring,v_ring.x,v_ring.y,e_radius,e_radius,0,0,500,500);
  imageMode(CORNER);

  var j=0;
  for(let i=0;i<bullets.length;i++){
    if(bullets[i].y<-45){
      j+=1
    }
  }

  for(let i=0;i<j;i++){
    bullets.shift();
  }

  //text("【通常時設定】",550,30)
  /*
  text("cooldown time",550,50)
  text(floor(a_cooldown_slider.value()/60)+" second",550,60)
  */
}



function fire() {
  append(bullets,createVector(v_fighter.x+40,v_fighter.y))
}

function fighterMove() {
  if(d_fighter==="R"){
    v_fighter.add(v_moveLR)
  }else if (d_fighter==="L") {
    v_fighter.sub(v_moveLR)
  }else if (d_fighter==="U") {
    v_fighter.sub(v_moveUD)
  }else if (d_fighter==="D") {
    v_fighter.add(v_moveUD)
  }
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW){
    d_fighter = "R"
  }else if (keyCode === LEFT_ARROW) {
    d_fighter = "L"
  }else if (keyCode === UP_ARROW) {
    d_fighter = "U"
  }else if (keyCode === DOWN_ARROW) {
    d_fighter = "D"
  }

  if(keyCode===81){
      remove();
  }

  /*
  if(keyCode===67&&is_cooldown){
    is_cooldown = false;
    isAcceleration = true;
    timer_Accelerarion = 0;
    timer_cooldown = 0;
  }
  */
  if(keyCode===67&&is_cooldown){
    is_ringEffect = true;
    v_ring.set(v_fighter.x+45,v_fighter.y+45)
  }
}

function keyReleased(){
  if(keyCode === RIGHT_ARROW ||keyCode === LEFT_ARROW
    ||keyCode === UP_ARROW||keyCode === DOWN_ARROW){
      d_fighter = "NONE"
    }
}
