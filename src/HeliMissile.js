/**
 * @class Missile
 */
class Missile
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset(
            "../assets/spyhuntersheet.png"),
            13,
            31,
            328,
            489,
            this.x,
            this.y,
            gameNs.game.ctx
        );

        this.sprite.setRotation(180);
        
        this.counter = 0;
        this.timeToBlow = 10;

        this.dropTimer = 0;
        this.explodeTimer = 30;

        this.turnOn = false;
        this.alive = true;
        this.flip = false;
    }

    update(playerX, playerY) {
        if(!this.alive) {
            gameNs.game.collisionManager.removePolygonCollider(this.collider);
        }
        this.move();
        this.counter++;
        if(this.counter > this.timeToBlow && !this.flip) {
            this.turnOn = true;
            this.flip = true;
        }
        if(this.turnOn) {
            this.collider =  new PolygonCollider([new Vector2(this.x,this.y), 
                new Vector2(this.x + 13,this.y) ,
                new Vector2(this.x + 13,this.y + 31),
                new Vector2(this.x,this.y + 31)
              ], ["missile"]
              );
            gameNs.game.collisionManager.addPolygonCollider(
                this.collider 
            );
            this.turnOn = false;
        }

        if(this.flip) {
            var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
            this.dropTimer++;
            if(this.dropTimer > this.explodeTimer ||
                CollisionManager.CollidedWithTag(
                CollisionManager.IndexOfElement(
                gameNs.game.collisionManager.polygonColliderArray, this.collider), 
                collisionResults, gameNs.game.collisionManager.polygonColliderArray, 
                      'Player')) {
                this.alive = false;
                
            }
        }
    }

    move() { 
        this.y += 10;
        this.sprite.move(0, 10);
        if(this.flip && !this.turnOn) {
            this.collider.shape.move(0, 10);
        }
        
    }  

    draw()
    {
        this.sprite.draw();
    }
    
}


