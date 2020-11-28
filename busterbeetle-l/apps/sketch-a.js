var Scroll_Y = 0;
var ui_X = 1376;
var end_Y = 1000;
var boss2_entryY = -700;
var missileY = -400;

var n_explosion=0;
var n_life = 32;


var p_hp_boss2=1000;


var i_fighter;
var i_fighter2;
var i_fighter1;
var i_fighter_afterImage;
var i_fighterA;
var i_fighterA_afterImage;
var i_explosion;

var i_ui_main;
var i_ui_main_on;
var i_ui_main_life2;
var i_ui_main_life3;
var i_ui_title_push;

var bullet;
var ground;
var ground2;
var ring;
var title;
var gameover;

var boss2;
var boss2_arm_left;
var boss2_arm_right;
var missile;
var mantis_small;
var endroll;
var logo;



var v_fighter;
var v_boss2;
var v_armL;
var v_armR;
var v_n_bulletsSpeed;
var v_moveUD;
var v_moveLR;
var v_ring;

//var h_bee = "alive";
var h_boss2 = "entry";

var arrPoints_fighter = [];

var d_fighter;

var bullets=[];

var e_radius = 1;

var is_cooldown=true;
var is_ringEffect=false;
var is_acceleration = false;
var is_respawn = false

var is_mantis = [true,true,true,true];

var state_scene = "title";

var timer_accelerarion = 0;
var timer_cooldown = 0;

var timer_respawn_boss2 = 0;
//var timer_respawn_bee = 0;

var s_shot;
var s_hit;
var s_explosion;
var s_speedup;
var s_ready;
var s_bgm;
var s_spawn;
var s_damage;
var s_title;
var s_end;



function preload(){
  i_fighter = loadImage("fighter.png");
  i_fighter2 = loadImage("fighter2.png");
  i_fighter1 = loadImage("fighter1.png");
  i_fighter_afterImage = loadImage("fighter.png");
  i_fighterA = loadImage("fighter.png");
  i_fighterA_afterImage = loadImage("fighter.png");
  i_explosion = loadImage("explosion.png");
  i_ui_title_push = loadImage("push_enterkey.png");

  boss2 = loadImage("boss2.png")
  boss2_arm_left = loadImage("boss2_arm_left.png")
  boss2_arm_right = loadImage("boss2_arm_right.png")
  missile = loadImage("missile.png")

  title = loadImage("title.png");
  bullet = loadImage("bullet.png");
  ground = loadImage("ground.png");
  ground2 = loadImage("ground2.png");
  ring = loadImage("ring.png");
  endroll = loadImage("endroll.jpg");
  mantis_small = loadImage("mantis_small.png");
  gameover = loadImage("gameover.png");
  logo = loadImage("logo.png")

  i_ui_main = loadImage("ui_main.png")
  i_ui_main_on = loadImage("ui_main_on.png")
  i_ui_main_life2 = loadImage("ui_main_life2.png");
  i_ui_main_life3 = loadImage("ui_main_life3.png")

  s_shot = loadSound("shot.mp3");
  s_hit = loadSound("hit.mp3");
  s_spawn = loadSound("spawn.mp3");
  s_explosion = loadSound("explosion.mp3");
  s_speedup = loadSound("speedup.mp3");
  s_ready = loadSound("ready.mp3");
  s_damage = loadSound("damage.mp3")
  s_bgm = loadSound("bgm.mp3");
  s_title = loadSound("title.mp3")
  s_end = loadSound("end.mp3")
}



function setup(){
  i_fighter_afterImage.filter('gray')
  i_fighterA_afterImage.filter('gray')

  createCanvas(1076,716);
  v_fighter = createVector(224,300)
  v_boss2 = createVector(0,0);


  //v_armL = createVector(150,315);
  //v_armR = createVector(138,315);

  v_armL = createVector(165,320);
  v_armR = createVector(200,320);

  for(let i=0;i<3;i++){
    append(arrPoints_fighter,v_fighter);
  }

  v_n_bulletsSpeed = createVector(0,0)

  v_moveUD = createVector(0,0);
  v_moveLR = createVector(0,0);
  v_ring = createVector(0,0);


  s_shot.setVolume(0.03);
  s_hit.setVolume(0.04);
  s_speedup.setVolume(0.1);
  s_ready.setVolume(0.1);
  s_explosion.setVolume(0.2);
  s_spawn.setVolume(0.07);
  s_damage.setVolume(0.05);


  s_bgm.setVolume(0.05);
  s_bgm.loop();
  //s_bgm.play();

  s_title.setVolume(0.1);
  s_end.setVolume(0.1);


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
          s_shot.play();
      }
    }
  }

  v_n_bulletsSpeed.set(0,-18)
  for(let i=0;i<bullets.length;i++){
    image(bullet,bullets[i].x,bullets[i].y,22,45);
    bullets[i].add(v_n_bulletsSpeed);
  }

  if(n_life >=30){
    image(i_fighter,v_fighter.x,v_fighter.y,90,90);
  }else if(n_life >= 10 && n_life<30){
    image(i_fighter2,v_fighter.x,v_fighter.y,90,90);
  }else{
    image(i_fighter1,v_fighter.x,v_fighter.y,90,90);
  }


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
    image(bullet,bullets[i].x,bullets[i].y,22,45);
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

function mainGame() {
  background(255);
  imageMode(CORNER);




  if(Scroll_Y>716){Scroll_Y=0;}

  if(v_fighter.x>448){v_fighter.set(448,v_fighter.y)}
  if(v_fighter.x<0){v_fighter.set(0,v_fighter.y)}
  if(v_fighter.y>626){v_fighter.set(v_fighter.x,626)}
  if(v_fighter.y<0){v_fighter.set(v_fighter.x,0)}




  if(is_acceleration){
    acceleration_loop();
  }else{
    default_loop();
  }

  if(is_ringEffect){
    e_radius +=150
    s_speedup.play();
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



  if(timer_cooldown>600){
    is_cooldown=true
    timer_cooldown = 0;
    s_ready.play();
  }

  if(p_hp_boss2<0){
    s_explosion.play();
    h_boss2= "broken"
    p_hp_boss2 = 0;
  }

  if(h_boss2==="alive"){
    for(let i=0;i<bullets.length;i++){
      if(collideRectRect(220,250,100,20,bullets[i].x,bullets[i].y,22,45)){
          //h_boss2 = "broken";
          p_hp_boss2 -= 1;
          s_hit.play();
      }
    }
    if(p_hp_boss2 < 500){
      if(collideRectRect(230,missileY,96,256,v_fighter.x+20,v_fighter.y+20,50,50)){
        n_life -= 1;
        s_hit.play();
      }
    }
    if(collideRectRect(v_fighter.x+20,v_fighter.y+20,50,50,v_armL.x+10,v_armL.y+50,100,100)&&is_acceleration===false){
      n_life -= 1;
      s_damage.play();
    }
    if(collideRectRect(v_fighter.x+20,v_fighter.y+20,50,50,v_armR.x+55,v_armR.y+50,100,100)&&is_acceleration===false){
      n_life -= 1;
      s_damage.play();
    }
      //rect(v_armL.x+10,v_armL.y+50,100,100)
      //rect(v_armR.x+55,v_armR.y+50,100,100)
      //rect(v_fighter.x+20,v_fighter.y+20,50,50)
  }




  if(h_boss2==="alive"){
    let bosposY = sin(frameCount/100)*100-100;
    //v_armL.set(150 + (sin(frameCount/10)*100),315 + (cos(frameCount/10)*100));
    //v_armR.set(138 + (cos(frameCount/10)*100),315 + (sin(frameCount/10)*100));

    //v_armL = createVector(165,320);
    //v_armR = createVector(200,320);

    if(is_acceleration){
      /*
      v_armL.set(165 + (sin(frameCount/300)*300),bosposY + 320 + (cos(frameCount/300)*300));
      v_armR.set(200 + (cos(frameCount/300)*300),bosposY + 320 + (sin(frameCount/300)*300));
      */
      image(boss2_arm_left,165,320+bosposY,180,180)
      image(boss2_arm_right,200,320+bosposY,180,180)

      //image(boss2_arm_left,v_armL.x,v_armL.y,180,180)
      //image(boss2_arm_right,v_armR.x,v_armR.y,180,180)
    }else{
      if(p_hp_boss2<500){
        missileY += 4;
        if(missileY > 716){
          missileY = -800;
        }
        image(missile,150,missileY);
      }

      v_armL.set(165 + (sin(frameCount/38)*300),bosposY + 320 + (cos(frameCount/38)*300));
      v_armR.set(200 + (cos(frameCount/40)*300),bosposY + 320 + (sin(frameCount/40)*300));
      image(boss2_arm_left,v_armL.x,v_armL.y,180,180)
      image(boss2_arm_right,v_armR.x,v_armR.y,180,180)
    }
    v_boss2.set(0,bosposY)
    image(boss2,v_boss2.x,v_boss2.y,538,358)
  }else if(h_boss2==="broken"){
    if(n_explosion===4){
      h_boss2="dead";
      n_explosion=0;
      is_respawn = true;
      //timer_respawn_bee
    }
    image(i_explosion,v_boss2.x,v_boss2.y-100,512,512,n_explosion*256,0,256,256)
    if(frameCount%15===0){
      n_explosion+=1;
    }

  }else if(h_boss2==="dead"){
    if(timer_respawn_boss2>300){
      is_respawn=false;
      state_scene = "end"
      timer_respawn_boss2 = 0;
      p_hp_boss2 = 1000;
      h_boss2="entry"
      //s_spawn.play()
    }
  }else if(h_boss2==="entry"){
    image(boss2_arm_left,165,320+boss2_entryY,180,180)
    image(boss2_arm_right,200,320+boss2_entryY,180,180)
    image(boss2,0,boss2_entryY,538,358)
    if(boss2_entryY>0){
      boss2_entryY= -700;
      h_boss2 = "alive"
    }else{
      boss2_entryY += 1;
    }
  }


  if(is_respawn===true){
    timer_respawn_boss2+=1
  }


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



  image(i_ui_main,538,0,538,716);

  if(is_cooldown===false){
    timer_cooldown+=1
  }else{
    if(is_acceleration===false){

      image(i_ui_main_on,538,0,538,716)
    }
  }

  if(n_life >=30){
    image(i_ui_main_life3,538,0,538,716)
  }else if(n_life >= 10 && n_life<30){
    image(i_ui_main_life2,538,0,538,716)
  }else if (n_life<0) {
    state_scene = "gameover"
    h_boss2 = "entry";
    boss2_entryY = -700;
  }

  fill(72,87,17)
  rect(730,43,map(p_hp_boss2,0,1000,0,300),26)



  //text(n_life,600,200)

  //rect(v_armL.x+10,v_armL.y+50,100,100)
  //rect(v_armR.x+55,v_armR.y+50,100,100)
  //rect(v_fighter.x+20,v_fighter.y+20,50,50)
}

function draw(){
  if(state_scene==="main"){
    mainGame();
  }else if(state_scene==="end"){
    s_bgm.stop();
    if(s_end.isPlaying()===false){
      s_end.loop();
    }
    background(0);
    if(end_Y< -2000){
      image(logo,0,150);
    }
    image(endroll,0,end_Y);
    end_Y -= 1;
    if(end_Y < -3000){
      end_Y = 1000;
      h_boss2 = "entry";
      state_scene = "title";
      s_end.stop();
    }
  }else if (state_scene === "title"){
    s_bgm.stop()
    if(s_title.isPlaying()===false){
      s_title.loop();
      //s_title.play()
    }
    image(title,0,0);
    image(i_ui_title_push,ui_X,600)
    if(ui_X < -737){
      ui_X = 1376
    }else{
      ui_X-=1.5
    }
  }else if(state_scene === "gameover"){
    s_bgm.stop()
    if(s_title.isPlaying()===false){
      s_title.loop();
      //s_title.play()
    }
    image(gameover,0,0);
    image(i_ui_title_push,ui_X,500)
    if(ui_X < -737){
      ui_X = 1376
    }else{
      ui_X-=1.5
    }
  }
}



function fire() {
  append(bullets,createVector(v_fighter.x+34,v_fighter.y-30))
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


  if(keyCode===67&&is_cooldown){
    is_ringEffect = true;
    v_ring.set(v_fighter.x+45,v_fighter.y+45)
  }

  if(state_scene==="title"&&keyCode===ENTER){
    n_life = 32;
    v_fighter.set(224,300);
    p_hp_boss2 = 1000;
    missileY = -800;
    s_title.stop();
    s_bgm.play();
    state_scene = "main"
  }
  if(state_scene==="gameover"&&keyCode===ENTER){
    state_scene = "title"
  }
}

function keyReleased(){
  if(keyCode === RIGHT_ARROW ||keyCode === LEFT_ARROW
    ||keyCode === UP_ARROW||keyCode === DOWN_ARROW){
      d_fighter = "NONE"
    }
}
