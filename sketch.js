var trex, trexrunning, trexcolided;
var ground, groundimage, invisibleGround;
var ObstaclesGroup, obs1, obs2, obs3, obs4, obs5, obs6;
var  CloudsGroup, cloudimage
var count = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameoverimage
var restart, restartimage

function preload () {
  trexrunning = loadAnimation ("trex1.png", "trex3.png", "trex4.png")
  trexcolided = loadImage ("trex_collided.png")
  groundimage = loadImage ("ground2.png")
  obs1 = loadImage ("obstacle1.png")
  obs2 = loadImage ("obstacle2.png")
  obs3 = loadImage ("obstacle3.png")
  obs4 = loadImage ("obstacle4.png")
  obs5 = loadImage ("obstacle5.png")
  obs6 = loadImage ("obstacle6.png")
  cloudimage = loadImage ("cloud.png")
  gameoverimage = loadImage ("gameOver.png")
  restartimage = loadImage ("restart.png")

}
function setup() {
  createCanvas(600, 200);
  //create a trex sprite
trex = createSprite(200,180,20,50);
trex.addAnimation ("trex",trexrunning);
trex.addAnimation ("colided",trexcolided);
trex.scale = 0.5;
  
ground = createSprite(200,180,400,20);
ground.addImage ("ground2" , groundimage );
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*count/100);
invisibleGround = createSprite(200,185,400,5);

invisibleGround.visible = false;

 ObstaclesGroup = new Group();
 CloudsGroup = new Group();

gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage("gameOver", gameoverimage);
gameOver.scale = 0.5;
restart.addImage("restart", restartimage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
}

function draw() {
  
  background(180);

   text("Score: "+ count, 500, 100);
  
  if(gameState === PLAY){
      count = count + Math.round(getFrameRate()/60);
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
     
    }
  
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles()
    if(ObstaclesGroup.isTouching(trex)){
     
      gameState = END;
     
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("colided",trexcolided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
    reset();
      }
    
  }
  
  drawSprites();
  
}

function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("trex",trexrunning);
  count = 0;
          
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random (80,120) )
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - 6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6)) 
   switch(rand){
    case 1:  obstacle.addImage(obs1);
              break;
    case 2:  obstacle.addImage(obs2);
              break;
    case 3:  obstacle.addImage(obs3);
              break;
    case 4:  obstacle.addImage(obs4);
              break;
    case 5:  obstacle.addImage(obs5);
              break;
    case 6:  obstacle.addImage(obs6);
              break;
    default:  break;         
   }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}