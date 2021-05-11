var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  background(147,182,100);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
   
  dog=createSprite(800,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.3;
  
  feed=createButton("FEED THE DOG");
  feed.position(830,100);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(730,100);
  addFood.mousePressed(addFoods);
}

function draw() {

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  fill("black");
  textSize(25);
  strokeWeight(2.5)
  stroke(198,244,31)
  lastFed=hour();
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 150,40);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",150,40);
  }
  else{
    text("Last Feed : "+ lastFed + " AM", 150,40);
  }
   
  foodObj.display();

  drawSprites();


}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){

  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }   

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}
function addFoods(){
  foodS++;
  dog.addImage(sadDog);
  database.ref('/').update({
    Food:foodS
  })
}


