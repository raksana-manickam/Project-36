class Food {
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage('Milk.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
      background(147,182,100);
      
      var x=70,y=100; 
      imageMode(CENTER);
      image(this.image,690,320,100,100)

      if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=80;
          y=y+70;
        }
        image(this.image,x,y,70,70);
        x=x+30;
      }
    }
  }
}