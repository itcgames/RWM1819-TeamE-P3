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
  }

  update() {
    this.y -= 6;
    this.sprite.setPosition(this.x, this.y);
    if(this.y < 0) {
      this.dead = true;
    }
  }

  draw() {
    this.sprite.draw();
  }
}
