/**
 * @class MotorCycle
 * inherits from EnemyVehicle base type
 */
class MotorCycle extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.savedCount = 0;
        this.saved = false;
        this.count = 50;
        this.leftHit = false;
        this.rightHit = false;
        this.explosionTime = false;
        this.newCount = 0;
        this.alive = true;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                23,
                                32,
                                168,
                                152,
                                this.x,
                                this.y,
                                gameNs.game.ctx);
        this.collider = new PolygonCollider([new Vector2(this.x, this.y),
                                                 new Vector2(this.x + 20, this.y),
                                                 new Vector2(this.x + 20, this.y + 35),
                                                 new Vector2(this.x, this.y + 35)],
                                                 ["motorCycle"],
                                                 ["motorCycleBig"]);
        gameNs.game.collisionManager.addPolygonCollider(this.collider);

        this.colliderBig = new PolygonCollider([new Vector2(this.x - 20, this.y - 20),
                                                 new Vector2(this.x + 40, this.y - 20),
                                                 new Vector2(this.x + 40, this.y + 55),
                                                 new Vector2(this.x - 20, this.y + 55)],
                                                 ["motorCycleBig"],
                                                 ["motorCycle"]);
        
        this.spriteAnimation = new AnimatedSprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                                 42,
                                                 42,
                                                 0,
                                                 565,
                                                 this.x,
                                                 this.y,
                                                 gameNs.game.ctx);
        this.animation = new Animation("explode", 0, 565, 42, 42, 6);
        this.animation.setFrameRate(150);
        this.animation.setLooped(true);
        this.spriteAnimation.setAnimation(this.animation);
        this.spriteAnimation.setScale(1.5,1.5)
        
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBig);

    }

    update(playerX,scrollSpeed)
    {
        var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
        if(this.alive){
          this.move(playerX,scrollSpeed, collisionResults);
          this.spill(scrollSpeed);
        }
        if (this.explosionTime)
        {
          this.y += (scrollSpeed / 2)
          this.spriteAnimation.setPosition(this.x, this.y);
          this.spriteAnimation.playAnimation();
          this.newCount += 1;
          if (this.newCount >= 32) {
             this.explosionTime = false;
             this.newCount = 0;
          }
        }

        if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bullet') && this.alive)
        {
          this.explode();
          gameNs.game.collisionManager.removePolygonCollider(this.collider);
          gameNs.game.collisionManager.removePolygonCollider(this.colliderBig);
        }

    }
    move(playerX,scrollSpeed, collisionResults)
    {
      if(this.saved === true)
      {
        this.savedCount = this.savedCount + 1;
        if(this.savedCount >= 50)
        {
          this.savedCount = 0;
          this.saved = false;
        }
      }
      
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds') && this.alive)
      {
        this.explode();
        gameNs.game.collisionManager.removePolygonCollider(this.collider);
        gameNs.game.collisionManager.removePolygonCollider(this.colliderBig);
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
      
      }
      if(this.leftHit == true){
        this.sprite.rotate(6);
      }
      if(this.rightHit == true){
        this.sprite.rotate(-6);
      }
      this.count = this.count + 1;
      if(this.count >= 50)
      {
      this.xVelocity = Math.random() * 6 - 3;
      this.yVelocity = Math.random() * 6 - 3;
      this.count = 0;
    }
      this.sprite.move(this.xVelocity,this.yVelocity);
      this.collider.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBig.shape.move(this.xVelocity,this.yVelocity);
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
    }

    draw()
    {
      if (this.alive){
        this.sprite.draw();
      }

      if (this.explosionTime){
        this.spriteAnimation.draw();
      }
    }
    explode()
    {
      // James please explode motorbike :)
      this.explosionTime = true;
      this.alive = false
    }

    spill(scrollSpeed) {
  
      var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
      if (CollisionManager.CollidedWithTag(
        CollisionManager.IndexOfElement(
          gameNs.game.collisionManager.polygonColliderArray, this.collider), 
          collisionResults, gameNs.game.collisionManager.polygonColliderArray, 
          'oil'))
      {
        this.saved = true;
        this.savedCount = -9000; // So can never be saved again.
        this.count = -9000; //Can never change direction again.
        if(this.xVelocity > 0){
        this.xVelocity = 6;
        this.yVelocity = scrollSpeed / 3;
        this.leftHit = true;
      }else if(this.xVelocity < 0){
        this.xVelocity = -6;
        this.yVelocity = scrollSpeed / 3;
        this.rightHit = true;
      }
    }
  }
}

