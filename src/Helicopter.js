/**
 * @class Helicopter
 * inherits from EnemyVehicle base type
 */
class Helicopter extends EnemyVehicle
{
    constructor(x, y)
    {
        super();

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

        this. randX = Math.random() * 800;
        this. randY = Math.random() * 800;

        this.pointAmount = 0;
        this.attackPlayer = false;

        this.missile = [];
    }

    update(playerX, playerY) {
        this.move(playerX, playerY);
        if(this.missile.length > 0) {
            if(!this.missile[0].alive) {
                gameNs.game.collisionManager.removePolygonCollider(this.missile[0].collider);
                this.missile.pop();
            }
            else {
                this.missile[0].update();
            }
            
        }
    }

    move(playerX, playerY) { 

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
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.move(this.xVel, this.yVel);
        this.rotorSprite.move(this.xVel, this.yVel);
    }  

    dropBomb() {
        if(this.missile.length === 0) {
            this.missile.push(new Missile(this.x, this.y));
        }
        
    }

    draw()
    {
        this.sprite.draw();
        this.rotorSprite.draw();
        if(this.missile.length > 0) {
            this.missile[0].draw();
        }
    }

    getPosition()
    {
        return {x: this.x, y: this.y}
    }
    
  }


