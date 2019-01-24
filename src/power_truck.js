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
        this.rocket = false;
        this.powerGiven = false;
        this.savedCount = 0;
        this.saved = false;
        this.dead = false;
        this.count = 50;
        this.speedX = 2;
        this.speedY = 2;
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
                                                 ["powerTruckBigLeft","powerTruckBigRight","powerTruck"]);
        gameNs.game.collisionManager.addPolygonCollider(this.collider);

        this.colliderBigLeft = new PolygonCollider([new Vector2(this.x - 20, this.y - 20),
                                                 new Vector2(this.x + 16, this.y - 20),
                                                 new Vector2(this.x + 16, this.y + 84),
                                                 new Vector2(this.x - 20, this.y + 84)],
                                                 ["powerTruckBigLeft"],
                                                 ["powerTruckBack","powerTruck","powerTruckBigRight"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBigLeft);

        this.colliderBigRight = new PolygonCollider([new Vector2(this.x + 16, this.y - 20),
                                                 new Vector2(this.x + 52, this.y - 20),
                                                 new Vector2(this.x + 52, this.y + 84),
                                                 new Vector2(this.x + 16, this.y + 84)],
                                                 ["powerTruckBigRight"],
                                                 ["powerTruckBack","powerTruck","powerTruckBigLeft"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBigRight);

        this.colliderTruck = new PolygonCollider([new Vector2(this.x, this.y),
                                                 new Vector2(this.x + 32, this.y),
                                                 new Vector2(this.x + 32, this.y + 64),
                                                 new Vector2(this.x , this.y + 64)],
                                                 ["powerTruck"],
                                                 ["powerTruckBack","powerTruckBigLeft","powerTruckBigRight"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderTruck);

    }

    update(playerX,playerY,scrollSpeed,alive)
    {
        //this.sprite.rotate(2);
        this.move(playerX,playerY,scrollSpeed,alive);

    }
    getDead()
    {
      return this.dead;
    }
    getPositionX()
    {
      return this.x;
    }
    getPositionY()
    {
      return this.y;
    }
    getRocketBool()
    {
      if(this.rocket == true)
      {
        this.rocket = false;
        return true;
      }

    }
    move(playerX,playerY,scrollSpeed,alive)
    {
      if(this.y < -100)
      {
        this.dead = true;
      }
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
    this.speedY = 4;
  }
  if(this.powerTime >= 100)
  {
    this.targetY = - 1000;
    if(this.powerGiven == false)
    {
    this.rocket = true;
    this.powerGiven = true;
  }
  }
    if(this.saved == false)
    {
      if(this.x < this.targetX)
      {
        this.xVelocity = this.speedX;
      }else{
        this.xVelocity = -this.speedX;
      }
      if(this.y < this.targetY)
      {
        this.yVelocity = this.speedY;
      }else{
        this.yVelocity = -this.speedY;
      }
    }

      if(this.saved === true)
      {
        this.savedCount = this.savedCount + 1;
        if(this.savedCount >= 1)
        {
          this.savedCount = 0;
          this.saved = false;
        }
      }
      var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderTruck), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        this.explode();
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBigLeft), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        if(this.saved === false){

          this.x += 5;
          this.sprite.move(+5, 0);
          this.colliderTruck.shape.move(+5, 0);
          this.collider.shape.move(+5,0);
          this.colliderBigLeft.shape.move(+5, 0);
          this.colliderBigRight.shape.move(+5, 0);
          this.xVelocity = 3;
          this.saved = true;
          this.count = 0;  // Wont change straight after
      }
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBigRight), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        if(this.saved === false){

        this.x -= 5;
        this.sprite.move(-5, 0);
        this.collider.shape.move(-5, 0);
        this.colliderTruck.shape.move(-5, 0);
        this.colliderBigRight.shape.move(-5, 0);
        this.colliderBigLeft.shape.move(-5, 0);
        this.xVelocity = -3;
        this.saved = true;
        this.count = 0;  // Wont change straight after
      }
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'Player'))
      {
        this.givePower = true;

      }


      this.sprite.move(this.xVelocity,this.yVelocity);
      this.collider.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBigLeft.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBigRight.shape.move(this.xVelocity,this.yVelocity);
      this.colliderTruck.shape.move(this.xVelocity,this.yVelocity);
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
    }

    draw()
    {
        this.sprite.draw();
    }
    explode()
    {
      this.dead = true;
    }
}
