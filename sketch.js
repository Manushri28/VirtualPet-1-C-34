var dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
  dogIMG = loadImage("dogImg1.png");
  dogHappyIMG = loadImage("dogImg.png");

}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
	dog = createSprite(250, 320, 10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  var foodStock = database.ref('Food');
  foodStock.on("value", readStock)

}


function draw() {  
  background(46, 139, 87);
  
  textSize(15);
  fill("white");
  text('Note: Press UP_ARROW to feed Drago Milk !', 100, 20);
  text('Food at Present: ' + foodS, dog.x-80, dog.y-90);
  
  if(keyWentDown(UP_ARROW)){
       writeStock(foodS);
       dog.addImage(dogHappyIMG);
  }


  drawSprites();
  
}

function readStock(data){
  foodS = data.val();  
}

function writeStock(x){

  if(x<=0){
     x=0;
  }
  else{
    x=x-1
  }
  if(x===0){
    x=20
  }

  database.ref('/').set({
      Food : x

  });
}

