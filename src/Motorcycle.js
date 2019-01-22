/**
 * @class MotorCycle
 * inherits from EnemyVehicle base type
 */
class MotorCycle extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.count = 50;
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
        gameNs.game.collisionManager.addPolygonCollider(this.colliderBig);

    }

    update()
    {
        //this.sprite.rotate(2);
        this.move();

    }
    move()
    {
      var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
      if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.colliderBig), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds')) {
        this.xVelocity = this.xVelocity * -1;
        this.yVelocity = this.yVelocity * -1;
      }
      this.count = this.count + 1;
      if(this.count >= 50)
      {
      this.xVelocity = Math.random() * 4 - 2;
      this.yVelocity = Math.random() * 4 - 2;
      this.count = 0;
    };
      this.sprite.move(this.xVelocity,this.yVelocity);
      this.collider.shape.move(this.xVelocity,this.yVelocity);
      this.colliderBig.shape.move(this.xVelocity,this.yVelocity);
    }

    draw()
    {
        this.sprite.draw();
    }
}
