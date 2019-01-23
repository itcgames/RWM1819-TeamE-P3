class Rocket {
  constructor(x, y) {
    console.log("CALLED");
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
      new Vector2(this.x + 4,this.y) ,
      new Vector2(this.x + 4,this.y + 8),
      new Vector2(this.x,this.y + 8)
    ], ["bullet"], ["Player", "motorCycleBig" , "truckBig"]);
    gameNs.game.collisionManager.addPolygonCollider(
      this.collider
     );
  }

  update() {
    this.y -= 10;
    this.sprite.setPosition(this.x, this.y);
    this.collider.shape.move(0, -10);
    if(this.y < 0 || this.collider.colliding) {
      this.dead = true;
      gameNs.game.collisionManager.removePolygonCollider(this.collider);
    }
  }
  get state()
  {
    return this.dead;
  }

  draw() {
    this.sprite.draw();
  }
}
