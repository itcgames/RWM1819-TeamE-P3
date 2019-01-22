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

        this. randX = Math.random() * (800 - 200) + 200;
        this. randY = Math.random() * (800 - 10) + 10;
        this.collider =  new PolygonCollider([new Vector2(this.x,this.y), 
            new Vector2(this.x + 32,this.y) ,
            new Vector2(this.x + 32,this.y + 64),
            new Vector2(this.x,this.y + 64)
        ], ["truck"]);
        gameNs.game.collisionManager.addPolygonCollider(
           this.collider 
            );
    }

    update()
    {
        if(this.x < this.randX && EnemyVehicle.prototype.mag(this.x - this.randX)) {
            this.x += 3;
            this.collider.shape.move(3, 0);
        }
        else if(EnemyVehicle.prototype.mag(this.x - this.randX)) {
            this.x -= 3;
            this.collider.shape.move(-3, 0);
        }
        if(this.y < this.randY && EnemyVehicle.prototype.mag(this.y - this.randY)) {
            this.y += 3;
            this.collider.shape.move(0, 3);
        }
        else if (EnemyVehicle.prototype.mag(this.y - this.randY)){
            this.y -= 3;
            this.collider.shape.move(0, -3);
        }
        if(EnemyVehicle.prototype.dist(this.x, this.y, this.randX, this.randY) < 30) {
            this. randX = Math.random() * (600 - 200) + 200;
            this. randY = Math.random() * (800 - 10) + 10;
        }
        if(this.collider.colliding) {
            this.health--;
            if(this.health <= 0) {
                gameNs.game.collisionManager.removePolygonCollider(this.collider);
            }
        }
        this.collider.position.y = this.y;
        this.sprite.setPosition(this.x, this.y);
    }

    draw()
    {
        this.sprite.draw();
    }

}