class Bullet {
  constructor(x, y) {
    this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/bullet.png"),
                                                          4,
                                                          8,
                                                          0,
                                                          0,
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
    ], ["bullet"]
    , ["Player"]);
    gameNs.game.collisionManager.addPolygonCollider(
      this.collider 
     );
  }

  update() {
    this.y -= 6;
    this.sprite.setPosition(this.x, this.y);
    this.collider.shape.move(0, -6);
    if(this.y < 0 || this.collider.colliding) {
      this.dead = true;
      gameNs.game.collisionManager.removePolygonCollider(this.collider);
    }
  }

  draw() {
    this.sprite.draw();
  }
}
