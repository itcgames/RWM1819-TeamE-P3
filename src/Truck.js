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
        this.health = 5;
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
            ["truckBig"]);
        gameNs.game.collisionManager.addPolygonCollider(
           this.collider
            );
        this.truckBig = new PolygonCollider([new Vector2(this.x - 20, this.y - 20),
            new Vector2(this.x + 52, this.y - 20),
            new Vector2(this.x + 52, this.y + 84),
            new Vector2(this.x - 20, this.y + 84)],
            ["truckBig"],
            ["truck"]);
        gameNs.game.collisionManager.addPolygonCollider(
            this.truckBig
            );
    }

    update()
    {
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
        if(EnemyVehicle.prototype.dist(this.x, this.y, this.randX, this.randY) < 30) {
            this. randX = Math.random() * (600 - 200) + 200;
            this. randY = Math.random() * (800 - 100) + 10;
        }
        if(this.collider.colliding) {
            this.health--;
            if(this.health <= 0) {
                gameNs.game.collisionManager.removePolygonCollider(this.collider);
            }
        }
        var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
        if (CollisionManager.CollidedWithTag(
            CollisionManager.IndexOfElement(
                gameNs.game.collisionManager.polygonColliderArray, 
                this.truckBig), collisionResults, 
                gameNs.game.collisionManager.polygonColliderArray, 'bounds')) {
            
            if(this.xVel > 0) {
                this.x -= 5;
                this.y -= 5;
                this.sprite.move(-5, 0);
                this.collider.shape.move(-5, 0);
                this.truckBig.shape.move(-5, 0);
            }
            else {
                this.x += 5;
                this.y += 5;
                this.sprite.move(5, 0);
                this.collider.shape.move(5, 0);
                this.truckBig.shape.move(5, 0);
            }
            
            this.xVel = this.xVel * -1;
            this.yVel = this.yVel * -1;
            this. randX = Math.random() * (800 - 200) + 200;
            this. randY = Math.random() * (800 - 100) + 10;
          }
        
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.move(this.xVel, this.yVel);
        this.collider.shape.move(this.xVel, this.yVel);
        this.truckBig.shape.move(this.xVel, this.yVel);
    }

    draw()
    {
        this.sprite.draw();
    }

}
