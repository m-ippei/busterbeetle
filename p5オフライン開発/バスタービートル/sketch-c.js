/*
実装したいもの
通常時と加速時の操作感

*/

var isFire = false;
var Scroll_Y = 0;

var i_fighter;
var bee;
var bullet;
var ground;

var v_fighter;
var v_n_bulletsSpeed;
var v_moveUD;
var v_moveLR;

var d_fighter;

var bullets=[];

var isAcceleration = false;

var a_bulletsSpeed_slider;
var a_bulletsRate_slider;
var a_scrollSpeed_slider;
var a_moveUD_slider;
var a_moveLR_slider;

var a2_bulletsSpeed_slider;
var a2_bulletsRate_slider;
var a2_scrollSpeed_slider;
var a2_moveUD_slider;
var a2_moveLR_slider;

var c_isFire;


function preload(){
  i_fighter = loadImage("fighter.png");
  bee = loadImage("bee.png");
  bullet = loadImage("bullet.png");
  ground = loadImage("ground.png");
}

function ui(){
  c_isFire = createCheckbox();
  c_isFire.changed(isAuto)
  c_isFire.position(710,575)

  a_bulletsSpeed_slider = createSlider(0.1, 100, 10,0.1);
  a_bulletsSpeed_slider.position(710, 40);
  a_bulletsSpeed_slider.style('width', '200px');

  a_bulletsRate_slider = createSlider(1, 60, 10);
  a_bulletsRate_slider.position(710, 70);
  a_bulletsRate_slider.style('width', '200px');

  a_scrollSpeed_slider = createSlider(0, 100, 10);
  a_scrollSpeed_slider.position(710, 130);
  a_scrollSpeed_slider.style('width', '200px');

  a_moveUD_slider = createSlider(0,100,10);
  a_moveUD_slider.position(710, 170);
  a_moveUD_slider.style('width', '200px');

  a_moveLR_slider = createSlider(0,100,10);
  a_moveLR_slider.position(710, 210);
  a_moveLR_slider.style('width', '200px');

  a2_bulletsSpeed_slider = createSlider(0.1, 100, 10,0.1);
  a2_bulletsSpeed_slider.position(710, 350);
  a2_bulletsSpeed_slider.style('width', '200px');

  a2_bulletsRate_slider = createSlider(1, 60, 10);
  a2_bulletsRate_slider.position(710, 380);
  a2_bulletsRate_slider.style('width', '200px');

  a2_scrollSpeed_slider = createSlider(0, 100, 10);
  a2_scrollSpeed_slider.position(710, 430);
  a2_scrollSpeed_slider.style('width', '200px');

  a2_moveUD_slider = createSlider(0,100,10);
  a2_moveUD_slider.position(710, 470);
  a2_moveUD_slider.style('width', '200px');

  a2_moveLR_slider = createSlider(0,100,10);
  a2_moveLR_slider.position(710, 510);
  a2_moveLR_slider.style('width', '200px');
}

function setup(){
  //createCanvas(538,716);
  createCanvas(700,716);
  v_fighter = createVector(224,626)
  v_n_bulletsSpeed = createVector(0,0)

  v_moveUD = createVector(0,0);
  v_moveLR = createVector(0,0);

  ui();
}

function default_loop() {
  Scroll_Y+=a_scrollSpeed_slider.value();

  v_moveUD.set(0,a_moveUD_slider.value());
  v_moveLR.set(a_moveLR_slider.value(),0);

  if(keyIsPressed||isFire){
    if(keyIsPressed){fighterMove();}
    if(keyIsDown(32)||isFire){
      if(frameCount%a_bulletsRate_slider.value()===0){
          fire();
      }
    }
  }

  v_n_bulletsSpeed.set(0,-a_bulletsSpeed_slider.value())
  for(let i=0;i<bullets.length;i++){
    image(bullet,bullets[i].x,bullets[i].y,10,45);
    bullets[i].add(v_n_bulletsSpeed);
  }
}

function acceleration_loop(){
  Scroll_Y+=a2_scrollSpeed_slider.value();

  v_moveUD.set(0,a2_moveUD_slider.value());
  v_moveLR.set(a2_moveLR_slider.value(),0);

  if(keyIsPressed||isFire){
    if(keyIsPressed){fighterMove();}
    if(keyIsDown(32)||isFire){
      if(frameCount%a2_bulletsRate_slider.value()===0){
          fire();
      }
    }
  }

  v_n_bulletsSpeed.set(0,-a2_bulletsSpeed_slider.value())
  for(let i=0;i<bullets.length;i++){
    image(bullet,bullets[i].x,bullets[i].y,10,45);
    bullets[i].add(v_n_bulletsSpeed);
  }
}

function draw(){
  background(255);
  imageMode(CORNER);
  if(Scroll_Y>716){Scroll_Y=0;}
  image(ground,0,Scroll_Y);
  image(ground,0,Scroll_Y-716);
  if(v_fighter.x>448){v_fighter.set(448,v_fighter.y)}
  if(v_fighter.x<0){v_fighter.set(0,v_fighter.y)}
  if(v_fighter.y>626){v_fighter.set(v_fighter.x,626)}
  if(v_fighter.y<0){v_fighter.set(v_fighter.x,0)}

  if(isAcceleration){
    acceleration_loop();
  }else{
    default_loop();
  }

  image(i_fighter,v_fighter.x,v_fighter.y,90,90);
  image(bee,300,300,45,45);

  var j=0;
  for(let i=0;i<bullets.length;i++){
    if(bullets[i].y<-45){
      j+=1
    }
  }

  for(let i=0;i<j;i++){
    bullets.shift();
  }

  var bulletSpeed_ps = a_bulletsSpeed_slider.value()*60
  var bulletRate_ps = floor(60 / a_bulletsRate_slider.value())
  var scrollSpeed_ps = a_scrollSpeed_slider.value()*60
  var moveUD_ps = a_moveUD_slider.value()*60
  var moveLR_ps = a_moveLR_slider.value()*60

  var bulletSpeed_ps2 = a2_bulletsSpeed_slider.value()*60
  var bulletRate_ps2 = floor(60 / a2_bulletsRate_slider.value())
  var scrollSpeed_ps2 = a2_scrollSpeed_slider.value()*60
  var moveUD_ps2 = a2_moveUD_slider.value()*60
  var moveLR_ps2 = a2_moveLR_slider.value()*60

  text("【通常時設定】",550,30)

  text("bullet speed",550,50)
  text(bulletSpeed_ps+" px/second",550,60)
  text("bullet rate",550,80)
  text(bulletRate_ps+" fire/second",550,90)

  text("back_scroll_speed",550,140)
  text(scrollSpeed_ps+" px/second",550,150)
  text("fighter UD speed",550,180)
  text(moveUD_ps+" px/second",550,190);
  text("fighter LR speed",550,220)
  text(moveLR_ps+" px/second",550,230)



  text("【加速時設定】",550,340)


  text("bullet speed",550,360)
  text(bulletSpeed_ps2+" px/second",550,370)
  text("bullet rate",550,390)
  text(bulletRate_ps2+" fire/second",550,400)
  text("back_scroll_speed",550,440)
  text(scrollSpeed_ps2+" px/second",550,450)
  text("fighter UD speed",550,480)
  text(moveUD_ps2+" px/second",550,490);
  text("fighter LR speed",550,520)
  text(moveLR_ps2+" px/second",550,530)
  text("auto_fire",550,590)

  const guide = "弾速\n発射レート\n背景スピード\n自機縦移動スピード\n自機横移動スピード"
  text(guide,550,650)
}

function isAuto() {
  if(this.checked()){
    isFire = true;
  }else{
    isFire = false
  }
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
  if(keyCode===67){
    if(isAcceleration){
      isAcceleration=false
    }else{
      isAcceleration=true
    }
  }
}

function keyReleased(){
  if(keyCode === RIGHT_ARROW ||keyCode === LEFT_ARROW
    ||keyCode === UP_ARROW||keyCode === DOWN_ARROW){
      fDir = "NONE"
    }


}
