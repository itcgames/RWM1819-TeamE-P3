class Car {
  constructor(x, y) {
    this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                                          26,
                                                          44,
                                                          8,
                                                          12,
                                                          x,
                                                          y,
                                                          gameNs.game.ctx);

    this.x = x;
    this.y = y;

    this.moveUp = this.moveUp.bind(this);
	  this.moveDown = this.moveDown.bind(this);
	  this.moveLeft = this.moveLeft.bind(this);
	  this.moveRight = this.moveRight.bind(this);
  }

  moveUp() {
    this.y -= 4;
  }

  moveDown() {
    this.y += 4;
  }

  moveLeft() {
    this.x -= 2;
  }

  moveRight() {
    this.x += 2;
  }

  update() {
    this.sprite.setPosition(this.x, this.y);
  }

  draw() {
    this.sprite.draw();
  }
}
