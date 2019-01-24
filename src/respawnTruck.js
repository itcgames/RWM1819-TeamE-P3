/**
 * @class RespawnTruck 
 * inherits from EnemyVehicle base type
 */
class RespawnTruck
{
    constructor(x, y)
    {
        this.x = x;
        this.currentX = this.x;
        this.y = y;
        this.health = 5;
        this.offScreen = true;
        this.canRespawn = true;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                40,
                                70,
                                47,
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
            this.yVel = 0;
            this.xVel = 0;
  
    }

    update(scrollSpeed, worldYpos)
    {
        var difY = this.y - this.randY;
        var difX = this.x - this.randX;

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
        if (worldYpos > 37000)
        {
            this.x = 400;
            this.canRespawn = true;
        }
        else if (worldYpos < 37000 && worldYpos > 32000)
        {
            this.x = 450;
        }
        else if (worldYpos < 32000 && worldYpos > 26000)
        {
            this.canRespawn = false;
        }
        else if (worldYpos < 26000 && worldYpos > 20000)
        {
            this.x = 245;
            this.canRespawn = true;
        }
        else if (worldYpos < 20000 && worldYpos > 17000)
        {
            this.canRespawn = false;
        }
        else if (worldYpos < 17000 && worldYpos > 15000)
        {
            this.x = 280;
            this.canRespawn = true;
        }
        else if (worldYpos < 15000 && worldYpos > 9000)
        {
            this.canRespawn = false;
        }
        else if (worldYpos < 9000)
        {
            this.x = 200;
            this.canRespawn = true;
        }
       
        if (this.y < 0)
        {
            this.reset();
            this.setVelocity(0);
            this.offScreen = true;
        }
        this.sprite.move(this.xVel, this.yVel);
        this.sprite.setPosition(this.x, this.y);
        this.collider.position = new Vector2(this.x, this.y)
        this.truckBig.position = new Vector2(this.x - 20, this.y - 20);
        this.collider.shape.move(this.xVel, this.yVel);
        this.truckBig.shape.move(this.xVel, this.yVel);
    }

    setVelocity(speed)
    {
        this.yVel = speed;
    }

    checkPosition()
    {
        if (this.y <= 650){
            return true;
        }
        else{
            return false;
        }
    }
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    getOffscreen(){
        return this.offScreen;
    }
    setOffscreen(detect){
        this.offScreen = detect
    }

    getSpawning()
    {
        return this.canRespawn;
    }

    reset(){
        this.x = this.currentX;
        this.y = 1000;
        this.sprite.setPosition(this.x, this.y);
        this.collider.position = new Vector2(this.x, this.y)
        this.truckBig.position = new Vector2(this.x - 20, this.y - 20);
    }

    draw()
    {
        this.sprite.draw();   
    }

}
