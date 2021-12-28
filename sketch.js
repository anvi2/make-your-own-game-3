var bgSprite , bgImg;
var girl , childStandingAnimation, childRunningAnimation , adultRunningAnimation ,adultStandingAnimation, teenageRunningAnimation,teenageStandingAnimation;
var brickWall, brickWallGrp,brickImg;
var ground;
var music;
var obstacle , obstaclesGrp;
var spikeImg , virusImg , cactusImg;
var lightBulb , lightBulbImg ,trophy, trophyImg , trophyGrp;
var score=0;


//load images
function preload(){
bgImg = loadImage("IMAGES/background 2.png");
childRunningAnimation = loadAnimation("IMAGES/child1.png " , "IMAGES/child2.png ","IMAGES/child3.png ","IMAGES/child4.png ","IMAGES/child5.png ",
"IMAGES/child6.png ","IMAGES/child7.png ","IMAGES/child8.png ")
childStandingAnimation = loadAnimation("IMAGES/child1.png");
brickImg = loadImage("IMAGES/brickWall.png");
teenageRunningAnimation = loadAnimation("IMAGES/T1.png" ,"IMAGES/T2.png","IMAGES/T3.png","IMAGES/T4.png","IMAGES/T5.png" );
adultRunningAnimation = loadAnimation("IMAGES/A1.png" ,"IMAGES/A2.png","IMAGES/A3.png","IMAGES/A4.png","IMAGES/A5.png" );
music = loadSound("music.mp3");
spikeImg = loadImage("IMAGES/spikes.png");
virusImg = loadImage("IMAGES/virus.png");
cactusImg = loadImage("IMAGES/cactus.png");
trophyImg=loadImage("IMAGES/trophy.png");
lightBulbImg= loadImage("IMAGES/lightBulb.png");


}





function setup() {
  createCanvas(windowWidth,windowHeight);

  //create background
  bgSprite = createSprite(width/2 , height/2);
  bgSprite.addImage(bgImg);
  bgSprite.scale = 2.2;
  bgSprite.velocityX = -5;

  //create girl
  girl =createSprite(width/2 - 500 ,height/2 + 120);
  girl.addAnimation("childRunning" , childRunningAnimation);
  girl.addAnimation("childStanding" , childStandingAnimation);
  girl.scale = 1.5;
  
//create invisible ground
  ground = createSprite(width/2-100, height/2+200 , 1500,30);
  

  music.loop();  

  //groups
  brickWallGrp = new Group ();
  obstaclesGrp = new Group();
  trophyGrp = new Group();
}


function draw(){

  background(255,255,255); 
  if(bgSprite.x < 0 ){
    bgSprite.x = width/2;
  } 
  
  //make the girl jump
  if(keyDown("SPACE") && girl.y>=300){
    girl.x -= 3;
    girl.velocityY = -8;
    
  }
  
  girl.velocityY = girl.velocityY + 0.5;

  //camera.position.x = girl.position.x;

  //ground's position
  ground.visible = false;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  girl.collide(ground);

  //setting collider radius of girl
  //girl.debug = true;
  girl.setCollider("rectangle" ,0,0, 10,80);


  //condition 1
  if(girl.isTouching(brickWallGrp)){
    girl.velocityY = 0;
    girl.changeAnimation("childStanding");
    bgSprite.velocityX=0;
    brickWallGrp.setVelocityXEach(0);
    obstaclesGrp.setVelocityXEach(0);
    trophyGrp.setVelocityXEach(0);

  }else{
    bgSprite.velocityX = -3;
    brickWallGrp.setVelocityXEach(-3);
    obstaclesGrp.setVelocityXEach(-3);
    trophyGrp.setVelocityXEach(-3);
  }

  //girl's movememts
  if(keyDown(RIGHT_ARROW)){
    girl.x += 4;
    girl.changeAnimation("childRunning");
  }
  if(keyDown(LEFT_ARROW)){
    girl.x -= 4;
    girl.changeAnimation("childRunning");
  }

  if(girl.isTouching(trophyGrp)){
    trophyGrp.destroyEach();
    score = score+10;
  }

  

  spawnBrickWalls();
  spawnObstacles();
  spawnTrophies();
  drawSprites();

  textSize(20);
  fill("red");
  strokeWeight(2);
  stroke("red");
  text("TROPHY:" + score , 10,30);
}

function spawnBrickWalls(){
  var randomFrameCount = Math.round(random(100,400));
  if(frameCount % randomFrameCount === 0){
    brickWall = createSprite(width + 20 , height/2 + 120);
    brickWall.addImage(brickImg);
    brickWall.velocityX = -4;
    brickWall.scale = 0.5;
    brickWall.lifeTime = width/3;
    brickWallGrp.add(brickWall);


  }
  }

  function spawnObstacles(){
    var randomFrameCount = Math.round(random(100,600));
    if(frameCount % randomFrameCount === 0){
      obstacle = createSprite(width + 20 , height/2);
      var randomObstacle = Math.round(random(1,3));
      console.log(randomObstacle);

      switch(randomObstacle){
        case 1 : obstacle.addImage(cactusImg);
                 obstacle.y = Math.round(random(300,120));
                 //obstacle.x = brickWallGrp.x;
                 obstacle.scale = 0.15;
                  break ;   
        case 2 : obstacle.addImage(spikeImg);
                 obstacle.y = height/2+150;
                 obstacle.scale = 0.25;
                break;
        case 3 : obstacle.addImage(virusImg);
                 obstacle.y=Math.round(random(600,200));
                 obstacle.scale = 0.3;
                 break;
      }
      obstacle.velocityX = -3;
     
      obstacle.lifeTime = width/3;
      obstaclesGrp.add(obstacle);
  
  
    }
    }

    function spawnTrophies(){
    if(frameCount % 700 === 0){
     trophy = createSprite(width + 20 , height/2- 220);
     trophy.addImage(trophyImg);
     trophy.velocityX = -3;
     trophy.scale = 0.15;
     trophy.y = Math.round(random(350,120));
     trophy.lifeTime = width/3;
     trophyGrp.add(trophy);

    }
  }