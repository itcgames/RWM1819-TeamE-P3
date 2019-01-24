class Rocket {
  constructor(x, y) {
    this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                                          13,
                                                          31,
                                                          328,
                                                          489,
                                                          x,
                                                          y,
                                                          gameNs.game.ctx);

    this.x = x;
    this.y = y;
    this.dead = false;
    this.collider =  new PolygonCollider([new Vector2(this.x,this.y),
      new Vector2(this.x + 13,this.y) ,
      new Vector2(this.x + 13,this.y + 31),
      new Vector2(this.x,this.y + 31)
    ], ["rocket"], ["Player","motorCycleBigLeft","motorCycleBigRight","powerTruckBigLeft","powerTruckBigRight" ,"truckBig","bounds"]);
    gameNs.game.collisionManager.addPolygonCollider(
      this.collider
     );
  }

  update(targetX, targetY,heliAlive) {
    if(heliAlive == false)
    {
      this.dead = true;
      gameNs.game.collisionManager.removePolygonCollider(this.collider);
    }
    if(this.x < targetX)
    {
      this.xVelocity = 10;
    }else{
      this.xVelocity = -10;
    }
    if(this.y < targetY)
    {
      this.yVelocity = 10;
    }else{
      this.yVelocity = -10;
    }

    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    this.sprite.setPosition(this.x, this.y);
    this.collider.shape.move(this.xVelocity, this.yVelocity);
  }
  get state()
  {
    return this.dead;
  }

  draw() {
    if(this.dead == false)
    {
    this.sprite.draw();
  }
  }
}
