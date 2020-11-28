/*
実装したいもの
加速値
ゲージ
弾の設定
自機の操作感
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

var a_bulletsSpeed_slider;
var a_bulletsRate_slider;
var a_scrollSpeed_slider;
var a_moveUD_slider;
var a_moveLR_slider;

var c_isFire;


function preload(){
  i_fighter = loadImage("fighter.png");
  bee = loadImage("bee.png");
  bullet = loadImage("bullet.png");
  ground = loadImage("ground.png");
}

function setup(){
  //createCanvas(538,716);
  createCanvas(700,716);
  v_fighter = createVector(224,626)
  v_n_bulletsSpeed = createVector(0,0)

  v_moveUD = createVector(0,0);
  v_moveLR = createVector(0,0);

  c_isFire = createCheckbox();
  c_isFire.changed(isAuto)
  c_isFire.position(710,50)

  a_bulletsSpeed_slider = createSlider(1, 100, 10);
  a_bulletsSpeed_slider.position(710, 10);
  a_bulletsSpeed_slider.style('width', '200px');

  a_bulletsRate_slider = createSlider(1, 60, 10);
  a_bulletsRate_slider.position(710, 30);
  a_bulletsRate_slider.style('width', '200px');

  a_scrollSpeed_slider = createSlider(0, 100, 10);
  a_scrollSpeed_slider.position(710, 90);
  a_scrollSpeed_slider.style('width', '200px');

  a_moveUD_slider = createSlider(0,100,10);
  a_moveUD_slider.position(710, 130);
  a_moveUD_slider.style('width', '200px');

  a_moveLR_slider = createSlider(0,100,10);
  a_moveLR_slider.position(710, 170);
  a_moveLR_slider.style('width', '200px');
}

function draw(){
  background(255);
  imageMode(CORNER);

  if(Scroll_Y>716){Scroll_Y=0;}
  image(ground,0,Scroll_Y);
  image(ground,0,Scroll_Y-716);
  Scroll_Y+=a_scrollSpeed_slider.value();

  if(v_fighter.x>448){v_fighter.set(448,v_fighter.y)}
  if(v_fighter.x<0){v_fighter.set(0,v_fighter.y)}
  if(v_fighter.y>626){v_fighter.set(v_fighter.x,626)}
  if(v_fighter.y<0){v_fighter.set(v_fighter.x,0)}

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


  text(bulletSpeed_ps+" px/second",550,30)
  text(bulletRate_ps+" fire/second",550,50)
  text("auto_fire",550,70)
  text("back_scroll_speed",550,90)
  text(scrollSpeed_ps+" px/second",550,110)
  text("fighter UD speed",550,130)
  text(moveUD_ps+" px/second",550,150);
  text("fighter LR speed",550,170)
  text(moveLR_ps+" px/second",550,190)
  const guide = "弾速\n発射レート\n自動発射\n背景スピード\n自機縦移動スピード\n自機横移動スピード"
  text(guide,550,250)
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
}

function keyReleased(){
  if(keyCode === RIGHT_ARROW ||keyCode === LEFT_ARROW
    ||keyCode === UP_ARROW||keyCode === DOWN_ARROW){
      fDir = "NONE"
    }

}

/*
var f;
var fc;
var bee;
var beec;
var bees = [];
var g;
var gy=0;
var b;
var bs = [];
var adh;
var adv;
var speed;
var fDir = "NONE"
var isA = false;
var aTimer = 0;
var bms = 10 ;
var brate = 30;
var ready = 0;
var groupB = -50;
var reB = false;
var level = 1;
var ss = [];

function preload(){
  f = loadImage("fighter.png");
  bee = loadImage("bee.png");
  b = loadImage("bullet.png");
  g = loadImage("ground.png");
}

function setup(){
  createCanvas(538,716);
  fc = createVector(269,626);
  beec = createVector(224,100);
  adh = createVector(4,0);
  adv = createVector(0,8);
  speed = createVector(0,-15);
  for(let i=0;i<level;i++){
    append(bees,i*10)
  }
}

function draw(){
  background(127,246,85);
  imageMode(CORNER);

  if(gy>716){
    gy=0;
  }
  image(g,0,gy);
  image(g,0,gy-716);
  if(isA){
    gy+=10
    aTimer += 1;
    bms = 60;
    brate = 3
    speed.set(0,-1);
    adh.set(12,0);
    adv.set(0,24);
    if(aTimer>100){
      aTimer = 0;
      isA=false;
      bms = 10;
      brate = 30
      ready = 0;
      speed.set(0,-15)
      adh.set(4,0);
      adv.set(0,8);
    }
  }else{
    gy+=60;
    ready+=1;
  }
  if(keyIsPressed){
    fighterMove()
    if(keyIsDown(32)){
      if(frameCount%brate===0){
          fire();
      }
    }
  }
  if(fc.x>508){fc.set(508,fc.y)}
  if(fc.x<27){fc.set(27,fc.y)}
  if(fc.y>626){fc.set(fc.x,626)}
  if(fc.y<0){fc.set(fc.x,0)}

  imageMode(CENTER);
  groupB+=0.5;
  if(groupB>800){
    groupB = -100;
  }
  for(let i=0;i<bs.length;i++){
    bs[i].add(speed);
    image(b,bs[i].x,bs[i].y,10,45)
    for(let j=0;j<bees.length;j++){
      if(collideRectRect(bs[i].x,bs[i].y,10,45,bees[i]+269,bees[i]+groupB,40,40)){
        bees[i] = false
      }
    }
  }
  var j=0;
  for(let i=0;i<bs.length;i++){
    if(bs[i].y<-45){
      j+=1
    }
  }
  for(let i=0;i<j;i++){
    bs.shift();
  }



  imageMode(CORNER);
  image(f,fc.x-45,fc.y,90,90);
  imageMode(CENTER);
  //image(bee,sin(frameCount/bms)*224+269,beec.y,90,90);
  var countB = 0;
  for(let i=0;i<bees.length;i++){
    if(bees[i]!==false){
      image(bee,bees[i]+269,bees[i]+groupB,40,40);
    }else{
      countB+=1;
    }
    if(bees.length===countB){
      reB = true;
      groupB = -100;
      level+=1;
    }
  }
  if(reB){
    if(groupB<-50){
      bees = [];
      for(let j=0;j<level;j++){
        append(bees,j*10)
      }
      reB=false;
    }
  }
  //image(bee,sin(frameCount/bms)*224+269,beec.y,40,40);
  //image(bee,sin((frameCount+10)/bms)*224+269,beec.y,40,40);
  //image(bee,sin(frameCount/bms)*224+269,beec.y,40,40);
  //image(bee,sin(frameCount/bms)*224+269,beec.y,40,40);

  fill(255);
  ellipse(fc.x-1,fc.y+48,10,10);
  if(isA){
    fill(204,0,0,(100-aTimer)*2.5);
    ellipse(fc.x-1,fc.y+48,10,10);
    //rect(fc.x-21,fc.y+44,(100-aTimer)*2.5,10);
  }else{
    if(ready>255){
      fill(0,255,65);
      ellipse(fc.x-1,fc.y+48,10,10);
    }else{
      fill(0,255,65,ready)
      ellipse(fc.x-1,fc.y+48,10,10);
    }
  }
}

function fire() {
  append(bs,createVector(fc.x,fc.y))
}

function fighterMove() {
  if(fDir==="R"){
    fc.add(adh)
  }else if (fDir==="L") {
    fc.sub(adh)
  }else if (fDir==="U") {
    fc.sub(adv)
  }else if (fDir==="D") {
    fc.add(adv)
  }
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW){
    fDir = "R"
  }else if (keyCode === LEFT_ARROW) {
    fDir = "L"
  }else if (keyCode === UP_ARROW) {
    fDir = "U"
  }else if (keyCode === DOWN_ARROW) {
    fDir = "D"
  }

  if(keyCode===67){
    if(ready>255){
      isA = true;
    }
  }

  if(keyCode===81){
      remove();
  }
}

function keyReleased(){
  if(keyCode === RIGHT_ARROW ||keyCode === LEFT_ARROW
    ||keyCode === UP_ARROW||keyCode === DOWN_ARROW){
      fDir = "NONE"
    }

}
*/
