class OilSpill {
    constructor(x, y) {
      this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                                            32,
                                                            32,
                                                            128,
                                                            608,
                                                            x,
                                                            y,
                                                            gameNs.game.ctx);
  
      this.x = x;
      this.y = y;
      this.dead = false;
      this.collider =  new PolygonCollider([new Vector2(this.x,this.y), 
        new Vector2(this.x + 32,this.y) ,
        new Vector2(this.x + 32,this.y + 32),
        new Vector2(this.x,this.y + 32)
      ], ["oil"]
      , ["bounds", "Player"]);
      gameNs.game.collisionManager.addPolygonCollider(
        this.collider 
       );
    }
  
    update(scrollSpeed) {
      this.y += scrollSpeed;
      this.sprite.setPosition(this.x, this.y);
      this.collider.shape.move(0, scrollSpeed);
      if(this.y >  1200) {
        this.dead = true;
        gameNs.game.collisionManager.removePolygonCollider(this.collider);
      }
    }
  
    draw() {
      this.sprite.draw();
    }
  }
  