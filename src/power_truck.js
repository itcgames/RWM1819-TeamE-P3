/**
 * @class PowerTruck
 * inherits from EnemyVehicle base type
 */
class PowerTruck extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.powerTime = 0;
        this.moveInfront = false;
        this.givePower = false;
        this.savedCount = 0;
        this.saved = false;
        this.count = 50;
        this.leftHit = false;
        this.rightHit = false;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                32,
                                64,
                                88,
                                192,
                                this.x,
                                this.y,
                                gameNs.game.ctx);



        this.collider = new PolygonCollider([new Vector2(this.x, this.y + 60),
                                                 new Vector2(this.x + 32, this.y + 60),
                                                 new Vector2(this.x + 32, this.y + 90),
                                                 new Vector2(this.x, this.y + 90)],
                                                 ["powerTruckBack"],
                                                 ["powerTruckBig","powerTruck"]);
        gameNs.game.collisionManager.addPolygonCollider(this.collider);

        this.colliderBig = new PolygonCollider([new Vector2(this.x - 2, this.y - 2),
                                                 new Vector2(this.x + 5, this.y - 2),
                                                 new Vector2(this.x + 5, this.y + 5),
                                                 new Vector2(this.x - 2, this.y + 5)],
                                                 ["powerTruckBig"],
                                                 ["powerTruckBack","powerTruck"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBig);

    }

    update(playerX,playerY,scrollSpeed,alive)
    {
        //this.sprite.rotate(2);
        this.move(playerX,playerY,scrollSpeed,alive);

    }
    move(playerX,playerY,scrollSpeed,alive)
    {
      if(this.givePower == false)
      {
        if(playerX >= this.x && this.moveInfront == false){
        this.targetY = playerY - 100;
        this.targetX = playerX - 80;
      }else if (this.moveInfront == false){
        this.targetY = playerY - 100;
        this.targetX = (playerX + 80);
      }else if(this.moveInfront == true){
        this.targetY = playerY - 100;
        this.targetX = playerX;
      }
      if((this.y - this.targetY) >= -10 && (this.y - this.targetY) <= 10){
      this.moveInfront = true;
      }else{
        this.moveInfront = false;
      }
  }else if(this.givePower == true)
  {
    this.targetX = playerX - 2;
    this.targetY = playerY - 20;
    this.powerTime = this.powerTime + 1;
  }
  if(this.powerTime >= 100)
  {
    this.targetY = - 1000;
  }
    if(this.saved == false)
    {
      if(this.x < this.targetX)
      {
        this.xVelocity = 2;
      }else{
        this.xVelocity = -2;
      }
      if(this.y < this.targetY)
      {
        this.yVelocity = 2;
      }else{
        this.yVelocity = -2;
      }
    }

      if(this.saved === true)
      {
        this.savedCount = this.savedCount + 1;
        if(this.savedCount >= 50)
        {
          this.savedCount = 0;
          this.saved = false;
        }
      }
      var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        this.explode();
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBig), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        if(this.saved === false){
        if(this.xVelocity < 0)
        {
          this.x += 5;
          this.sprite.move(+5, 0);
          this.collider.shape.move(+5, 0);
          this.colliderBig.shape.move(+5, 0);
          this.xVelocity = 3;
          this.saved = true;
          this.count = 0;  // Wont change straight after
      }else{
        this.x -= 5;
        this.sprite.move(-5, 0);
        this.collider.shape.move(-5, 0);
        this.colliderBig.shape.move(-5, 0);
        this.xVelocity = -3;
        this.saved = true;
        this.count = 0;  // Wont change straight after
      }
      }
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'Player'))
      {
        this.givePower = true;
        /*
        if(alive === true)
        {
          this.saved = true;
          this.savedCount = -9000; // So can never be saved again.
          this.count = -9000; //Can never change direction again.
          if(this.x >= playerX){
            this.xVelocity = 6;
            this.yVelocity = scrollSpeed / 3;
            this.leftHit = true;
        }else if(this.x < playerX){
            this.xVelocity = -6;
            this.yVelocity = scrollSpeed / 3;
            this.rightHit = true;
          }
        }*/
      }
      if(this.leftHit == true){
        this.sprite.rotate(6);
      }
      if(this.rightHit == true){
        this.sprite.rotate(-6);
      }
      /*
      this.count = this.count + 1;
      if(this.count >= 50)
      {
      this.xVelocity = Math.random() * 6 - 3;
      this.yVelocity = Math.random() * 6 - 3;
      this.count = 0;
    } */
      this.sprite.move(this.xVelocity,this.yVelocity);
      this.collider.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBig.shape.move(this.xVelocity,this.yVelocity);
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
    }

    draw()
    {
        this.sprite.draw();
    }
    explode()
    {
      // James please explode motorbike :)
    }
}
