/*
実装したいもの
加速値
ゲージ
弾の設定
自機の操作感
*/

var fighter;
var bee;
var bullet;
var ground;

function preload(){
  fighter = loadImage("fighter.png");
  bee = loadImage("bee.png");
  bullet = loadImage("bullet.png");
  ground = loadImage("ground.png");
}

function setup(){
  createCanvas(538,716);
}

function draw(){
  imageMode(CORNER);
  image(ground,0,0);
  image(bullet,100,100,10,45);
  image(fighter,200,200,90,90);
  image(bee,300,300,45,45);
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
