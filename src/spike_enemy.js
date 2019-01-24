/**
 * @class SpikeEnemy
 * inherits from EnemyVehicle base type
 */
class SpikeEnemy extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.attack = false;
        this.savedCount = 0;
        this.saved = false;
        this.count = 50;
        this.leftHit = false;
        this.rightHit = false;
        this.explosionTime = false;
        this.alive = true;
        this.newCount = 0;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                34,
                                47,
                                336,
                                82,
                                this.x,
                                this.y,
                                gameNs.game.ctx);
        this.colliderSpikeLeft = new PolygonCollider([new Vector2(this.x, this.y + 8),
                                                 new Vector2(this.x + 5, this.y + 8),
                                                 new Vector2(this.x + 5, this.y + 40),
                                                 new Vector2(this.x, this.y + 40)],
                                                 ["spikeLeft"],
                                                 ["spikeRight","spikeEnemy","spikeEnemyBig"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderSpikeLeft);

        this.colliderSpikeRight = new PolygonCollider([new Vector2(this.x + 29, this.y + 8),
                                                 new Vector2(this.x + 34, this.y + 8),
                                                 new Vector2(this.x + 34, this.y + 40),
                                                 new Vector2(this.x + 29, this.y + 40)],
                                                 ["spikeRight"],
                                                 ["spikeEnemyBig","spikeEnemy","spikeLeft"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderSpikeRight);

        this.collider = new PolygonCollider([new Vector2(this.x + 5, this.y),
                                                 new Vector2(this.x + 29, this.y),
                                                 new Vector2(this.x + 29, this.y + 47),
                                                 new Vector2(this.x + 5, this.y + 47)],
                                                 ["spikeEnemy"],
                                                 ["spikeRight","spikeLeft","spikeEnemyBig"]);
        gameNs.game.collisionManager.addPolygonCollider(this.collider);

        this.colliderBigRight = new PolygonCollider([new Vector2(this.x + 17.5, this.y - 20),
                                                 new Vector2(this.x + 55, this.y - 20),
                                                 new Vector2(this.x + 55, this.y + 55),
                                                 new Vector2(this.x + 17.5, this.y + 55)],
                                                 ["spikeEnemyBigRight"],
                                                 ["spikeRight","spikeLeft","spikeEnemy"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBigRight);
        this.colliderBigLeft = new PolygonCollider([new Vector2(this.x - 20, this.y - 20),
                                                 new Vector2(this.x + 17.5, this.y - 20),
                                                 new Vector2(this.x + 17.5, this.y + 55),
                                                 new Vector2(this.x - 20, this.y + 55)],
                                                 ["spikeEnemyBigLeft"],
                                                 ["spikeRight","spikeLeft","spikeEnemy"]);
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBigLeft);
        
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
    }

    update(playerX,playerY,scrollSpeed,alive)
    {
        var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
        //this.sprite.rotate(2);
        if(this.alive) {
          this.move(playerX,playerY,scrollSpeed,alive);
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
          gameNs.game.collisionManager.removePolygonCollider(this.colliderBigLeft);
          gameNs.game.collisionManager.removePolygonCollider(this.colliderBigRight);
          gameNs.game.collisionManager.removePolygonCollider(this.colliderSpikeRight);
          gameNs.game.collisionManager.removePolygonCollider(this.colliderSpikeLeft);
        }

    }
    move(playerX,playerY,scrollSpeed,alive)
    {
      if(playerX >= this.x && this.attack == false)
      {
      this.targetY = playerY;
      this.targetX = playerX - 50;
    }else if (this.attack == false){
      this.targetY = playerY;
      this.targetX = (playerX + 50);
    }else if(this.attack == true)
    {
      this.targetY = playerY;
      this.targetX = playerX;
    }
    if(this.saved == false)
    {
      if(this.x < this.targetX)
      {
        this.xVelocity = 1;
      }else{
        this.xVelocity = -1;
      }
      if(this.y < this.targetY)
      {
        this.yVelocity = 1;
      }else{
        this.yVelocity = -1;
      }
    }
    if((this.y - this.targetY) >= -10 && (this.y - this.targetY) <= 10)
    {
      this.attack = true;
    }else{
      this.attack = false;
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
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        this.explode();
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBigLeft), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
      {
        if(this.saved === false){

          this.x += 5;
          this.sprite.move(+5, 0);
          this.collider.shape.move(+5, 0);
          this.colliderBigLeft.shape.move(+5, 0);
          this.colliderBigRight.shape.move(+5, 0);
          this.colliderSpikeRight.shape.move(+5, 0);
          this.colliderSpikeLeft.shape.move(+5, 0);
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
        this.colliderBigRight.shape.move(-5, 0);
        this.colliderBigLeft.shape.move(-5, 0);
        this.colliderSpikeRight.shape.move(-5, 0);
        this.colliderSpikeLeft.shape.move(-5, 0);
        this.xVelocity = -3;
        this.saved = true;
        this.count = 0;  // Wont change straight after
      }
      }
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'Player'))
      {
        if(alive === true)
        {
          this.colliderSpikeRight.shape.move(10000,10000);
          this.colliderSpikeLeft.shape.move(10000,10000);
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
      this.colliderBigLeft.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBigRight.shape.move(this.xVelocity,this.yVelocity);
      this.colliderSpikeRight.shape.move(this.xVelocity,this.yVelocity);
      this.colliderSpikeLeft.shape.move(this.xVelocity,this.yVelocity);
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
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
        this.explosionTime = true;
        this.alive = false
    }
}
