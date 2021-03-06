/**
 * @class Truck
 * inherits from EnemyVehicle base type
 */
class Truck extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.x = x;
        this.y = y;
        this.health = 3;
        this.explosionTime = false;
        this.alive = true;
        this.newCount = 0;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                32,
                                64,
                                8,
                                192,
                                this.x,
                                this.y,
                                gameNs.game.ctx);

        this. randX = Math.random() * (800 - 100) + 100;
        this. randY = Math.random() * (800 - 100) + 10;
        this.collider =  new PolygonCollider([new Vector2(this.x,this.y),
            new Vector2(this.x + 32,this.y) ,
            new Vector2(this.x + 32,this.y + 64),
            new Vector2(this.x,this.y + 64)],
            ["truck"],
            ["truckBigLeft", "truckBigRight"]);
        gameNs.game.collisionManager.addPolygonCollider(
           this.collider
            );
            this.colliderBigLeft = new PolygonCollider([new Vector2(this.x - 20, this.y - 20),
                                                     new Vector2(this.x + 16, this.y - 20),
                                                     new Vector2(this.x + 16, this.y + 84),
                                                     new Vector2(this.x - 20, this.y + 84)],
                                                     ["truckBigLeft"],
                                                     ["truck","truckBigRight"]);
            gameNs.game.collisionManager.addPolygonCollider(this.colliderBigLeft);

            this.colliderBigRight = new PolygonCollider([new Vector2(this.x + 16, this.y - 20),
                                                     new Vector2(this.x + 52, this.y - 20),
                                                     new Vector2(this.x + 52, this.y + 84),
                                                     new Vector2(this.x + 16, this.y + 84)],
                                                     ["truckBigRight"],
                                                     ["truck","truckBigLeft"]);
            gameNs.game.collisionManager.addPolygonCollider(this.colliderBigRight);
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

    update(scrollSpeed)
    {
        var difY = this.y - this.randY;
        var difX = this.x - this.randX;

        var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();

        if (this.alive) {
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
            if(EnemyVehicle.prototype.dist(this.x, this.y, this.randX, this.randY) < 30) {
                this. randX = Math.random() * (600 - 200) + 200;
                this. randY = Math.random() * (800 - 100) + 10;
            }

            if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBigLeft), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
            {
                this.x += 5;
                this.sprite.move(+5, 0);
                this.collider.shape.move(+5,0);
                this.colliderBigLeft.shape.move(+5, 0);
                this.colliderBigRight.shape.move(+5, 0);
                this.xVel = 3;
                this. randX = Math.random() * (600 - 200) + 200;
            }
            if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBigRight), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds'))
            {
              this.x -= 5;
              this.sprite.move(-5, 0);
              this.collider.shape.move(-5, 0);
              this.colliderBigRight.shape.move(-5, 0);
              this.colliderBigLeft.shape.move(-5, 0);
              this.xVel = -3;
              this. randX = Math.random() * (200 - 200) + 200;

            }

            this.x += this.xVel;
            this.y += this.yVel;
            if (CollisionManager.CollidedWithTag( CollisionManager.IndexOfElement
                (gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults,
                    gameNs.game.collisionManager.polygonColliderArray, 'bullet') && this.alive) {
                        this.health--;
                    }
            if (this.health <= 0)
            {
                gameNs.game.collisionManager.removePolygonCollider(this.collider);
                gameNs.game.collisionManager.removePolygonCollider(this.colliderBigLeft);
                gameNs.game.collisionManager.removePolygonCollider(this.colliderBigRight);
                this.explosionTime = true;
                this.alive = false;
            }
            
        }
        if (this.explosionTime) 
        {
            this.y += (scrollSpeed / 2)
            this.spriteAnimation.setPosition(this.x, this.y);
            this.spriteAnimation.playAnimation();
            this.newCount += 1;
            if (this.newCount >= 32) {
                //this.explosionTime = false;
                this.newCount = 0;
            }
        }
        this.sprite.move(this.xVel, this.yVel);
            this.collider.shape.move(this.xVel, this.yVel);
            this.colliderBigLeft.shape.move(this.xVel, this.yVel);
            this.colliderBigRight.shape.move(this.xVel, this.yVel);
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

}
