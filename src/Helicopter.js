/**
 * @class Helicopter
 * inherits from EnemyVehicle base type
 */
class Helicopter extends EnemyVehicle
{
    constructor(x, y)
    {
        super();

        this.explosionTime = false;

        this.alive = true;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset(
            "../assets/spyhuntersheet.png"),
            33,
            64,
            8,
            344,
            this.x,
            this.y,
            gameNs.game.ctx
        );


        this.rotorSprite = new Sprite(gameNs.game.assetManager.getAsset(
            "../assets/spyhuntersheet.png"),
            55,
            55,
            247,
            349,
            this.x - 15,
            this.y - 10,
            gameNs.game.ctx
        );

        this.collider = new PolygonCollider([new Vector2(this.x - 20, this.y),
                                                 new Vector2(this.x + 55, this.y),
                                                 new Vector2(this.x + 55, this.y + 55),
                                                 new Vector2(this.x - 20, this.y + 55)],
                                                 ["Helicopter"],
                                                 ["spikeRight","spikeLeft","spikeEnemyBig","bounds"]);
        gameNs.game.collisionManager.addPolygonCollider(this.collider);

        this. randX = Math.random() * 800;
        this. randY = Math.random() * 800;

        this.pointAmount = 0;
        this.attackPlayer = false;

        this.missile = [];

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
        this.spriteAnimation.setScale(2.5,2.5);
    }
    getHeliAlive()
    {
      return this.alive;
    }
    update(playerX, playerY,scrollSpeed) {
      if (this.explosionTime)
      {
        this.y += (scrollSpeed / 2)
        this.spriteAnimation.setPosition(this.x, this.y);
        this.spriteAnimation.playAnimation();
        this.newCount += 1;
        if (this.newCount >= 32) {
           this.explosionTime = false;
           //this.animation.setLooped(false);
           this.newCount = 0;
        }
      }

        this.move(playerX, playerY,scrollSpeed);
        if(this.missile.length > 0) {
            if(!this.missile[0].alive) {
                gameNs.game.collisionManager.removePolygonCollider(this.missile[0].collider);
                this.missile.pop();
            }
            else {
                this.missile[0].update();
            }

        }
        var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
        if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'rocket') && this.alive)
        {
          gameNs.game.collisionManager.removePolygonCollider(this.collider);
          this.explode();
        }
    }
    getPositionX(){
      return this.x;
    }
    getPositionY(){
      return this.y;
    }

    move(playerX, playerY,scrollSpeed) {

        this.rotorSprite.rotate(15);
        var difY = this.y - this.randY;
        var difX = this.x - this.randX;
        if(this.x < this.randX && EnemyVehicle.prototype.mag(difX)) {
            this.xVel = 3;
        }
        else if(EnemyVehicle.prototype.mag(difX)) {
            this.xVel = -3;
        }
        if(this.y < this.randY && EnemyVehicle.prototype.mag(difY)) {
            this.yVel = 3;
        }
        else if (EnemyVehicle.prototype.mag(difY)){
            this.yVel = -3;
        }
        if(EnemyVehicle.prototype.dist(this.x, this.y, this.randX, this.randY) < 30 &&
            this.pointAmount < 6) {
            if(this.attackPlayer) {
                this.dropBomb();
                this.randX = Math.random() * 800;
                this.randY = Math.random() * 800;
                this.attackPlayer = false;
            }
            else {
                console.log(playerX);
                this.randX = playerX;
                this.randY = playerY - 150;
                this.attackPlayer = true;
            }

            this.pointAmount++;
        }
        if(this.pointAmount >= 6) {
            this. randX = 1300;
            this. randY = 1300;
        }

        if(this.alive == false){
          this.xVel = 0;
          this.yVel = scrollSpeed;
        }
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.move(this.xVel, this.yVel);
        this.collider.shape.move(this.xVel,this.yVel);
        this.rotorSprite.move(this.xVel, this.yVel);
    }

    dropBomb() {
        if(this.missile.length === 0) {
            this.missile.push(new Missile(this.x, this.y));
        }

    }

    draw()
    {
        if (this.explosionTime){
            this.spriteAnimation.draw();
          }
        else{
          this.sprite.draw();
          this.rotorSprite.draw();
        }
        if(this.missile.length > 0) {
            this.missile[0].draw();
        }
    }
    explode()
    {
      this.explosionTime = true;
      this.alive = false;
    }
    getPosition()
    {
        return {x: this.x, y: this.y}
    }

  }
