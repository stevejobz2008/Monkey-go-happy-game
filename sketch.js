//declarin variables for game objects and behaviour indicators 
var monkey,monkeyrun;
var ground, invisibleground;
var bananaGroup;
var obstacleGroup;
var stone,Stoneimg;
var banana,Bananaimg;
var gameState, play, end;
var score;
var back,backgroundimg;
var restart,iconImage;


function preload() {
  
  monkeyrun = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  Bananaimg = loadImage("banana.png");
  backgroundimg = loadImage("jungle.jpg");
  Stoneimg = loadImage("stone.png");  
  iconImage = loadImage("901841-200.png");
  
}

//initial environment of the game
function setup() {

  back = createSprite(20,390, 400, 20);
  back.addImage("backgroundimg",backgroundimg);
  
  //monkey sprite 
  monkey = createSprite(40,330,20,20);
  monkey.addAnimation("monkeyrun",monkeyrun);
  monkey.scale = 0.1;

  //ground
  ground = createSprite(20,390, 400, 20);
  ground.addImage("backgroundimg",backgroundimg);
  ground.visible = false;
  
  restart = createSprite(200,200,20,20);
  restart.addImage("iconImage",iconImage);
  
  
  //invisible ground sprite 
  invisibleground = createSprite(200, 370, 400, 8);
  invisibleground.visible = false;

  //assigning gamestates
  play = 1;
  end = 0;
  gameState = play;

  // survival time(score)
  score = 0;

  //creating groups 
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

//all commands that have to be executed throughought the program
function draw() {

background("white");
  
      
  

  if (gameState == play) {

    score = score + Math.round(World.frameRate / 60);
     
  
   restart.visible = false;
    
    switch(score) {
      case 1000: monkey.scale = 0.12;
        break;

      case 2000: monkey.scale = 0.14;
        break;
        
      case 3000: monkey.scale = 0.16;
        break;
  
      case 4000: monkey.scale = 0.18;
        break;
       
        default: break;
        
  
  
    }
    
    
    //monkey behaviour
    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -13;
    }
    monkey.velocityY = monkey.velocityY + 0.7; //gravity effect

    //ground behaviour
    back.velocityX = (-1) * (6 + (score / 70));
    
    if (back.x < 0) {
      back.x = back.width / 2;
    }
    
    
    //function call to create the obstacles and the bananas
    obstacles();
    bananas();

    if (monkey.isTouching(bananaGroup)) {
      score = score + 2;
   bananaGroup.destroyEach();
      
    }
      
    if (monkey.isTouching(obstacleGroup)) {
      gameState = end;
}
    
    
  } else if (gameState == end) {

    monkey.y = 325;
    restart.visible = true;

    back.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);

    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
     if (mousePressedOver(restart)) {
        reset();
     }
  
  }
  


monkey.collide(invisibleground);
  
  drawSprites();
  
  //displaying the scoreboard
    textSize(20);
    
  text("Score:" + score, 280, 20);

}


//function defination to create clouds
function obstacles() {
  if (World.frameCount % 150 == 0) {

    stone = createSprite(420, 337, 20, 20);
    stone.addImage("Stoneimg", Stoneimg);
    stone.scale = 0.1;
    stone.velocityX = -(6 + score* 3 / 100);
    stone.lifetime = (-1) * (width / stone.velocityX);
    obstacleGroup.add(stone);

  }
}
//function defination to create bananas
function bananas() {
  if (World.frameCount % 90 == 0) {

    banana = createSprite(420, random(120, 200), 20, 20);
    banana.addImage("Bananaimg", Bananaimg);
    banana.scale = 0.1;
    banana.velocityX = -(6 + score * 3 / 100);
    banana.lifetime = 160;
    bananaGroup.add(banana);

  }
}

function reset() {
   
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
gameState = play;
}