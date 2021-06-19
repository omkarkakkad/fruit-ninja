var PLAY=1;
var END=0;
var gameState = PLAY;

var score;

var sword;
var swordImage;

var gameover;
var gameover_Image;

var monster;

var monster_Image;

var fruit1;
var fruit2;
var fruit3;
var fruit4;

var fruit;

var fruitGroup;
var enemyGroup;

var knifeSwooshSound;
var gameOverSound;

function preload(){
  
  monster_Image = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  swordImage = loadImage("sword.png");

  gameover_Image = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(500,500);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=1;
  
  gameover = createSprite(250,250,10,10);
  gameover.addImage(gameover_Image);
  gameover.scale=2;
  
  score = 0;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw() {
  background("lightblue");
  
  if (gameState === PLAY){
    gameover.visible=false;
    
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score + 2;
    knifeSwooshSound.play();
  } 
    
  else {
    if (enemyGroup.isTouching(sword)){
    gameState=END;
    
    enemyGroup.destroyEach(); 
    fruitGroup.destroyEach();
   
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    gameOverSound.play();
  }
 
  }
  
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  textSize(25);
  text("Score: "+ score, 200,30);
  
  fruits();
  Enemy();
    
  }
  
  if (gameState === END){
    sword.visible=false;
    gameover.visible=true;
  }
  
  drawSprites();
}

function fruits(){
  if (World.frameCount%60===0){
   fruit=createSprite(500,400,20,20);
   fruit.scale=0.2;
   r=Math.round(random(1,4));
      if(r===1) {
      fruit.addImage(fruit1);
    } else if (r===2) {
      fruit.addImage(fruit2); 
    } else if (r===3) {
      fruit.addImage(fruit3); 
    } else {
      fruit.addImage(fruit4);
    } 
  
    fruit.y = Math.round(random(200,300))
    fruit.velocityX=-10;
    fruit.setLifetime=50;
    fruitGroup.add(fruit);
  }
  
}

function Enemy(){
  if (World.frameCount%150===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("running",monster_Image);
    monster.y=Math.round(random(50,200));
    monster.velocityX=-10;
    monster.lifetime=50;
    
    enemyGroup.add(monster);
  }
}
