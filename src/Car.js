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

    this.bullets = [];

    this.bulletTimer = 0;
    this.bulletTime = 6;

    this.moveUp = this.moveUp.bind(this);
	  this.moveDown = this.moveDown.bind(this);
	  this.moveLeft = this.moveLeft.bind(this);
	  this.moveRight = this.moveRight.bind(this);
    this.shoot = this.shoot.bind(this);

    this.upperYLimit = 10;
    this.lowerYLimit = 800;
    this.limitOffset = 400;
  }

  moveUp() {
    if(this.y > this.upperYLimit)
      this.y -= 4;
  }

  moveDown() {
    if(this.y < this.lowerYLimit)
      this.y += 4;
  }

  moveLeft() {
    this.x -= 2;
  }

  moveRight() {
    this.x += 2;
  }

  shoot() {
    if(this.bulletTimer > this.bulletTime) {
      this.bullets.push(new Bullet(this.x + this.sprite.getGlobalBounds().width / 2, this.y));
      this.bulletTimer = 0;
    }

  }

  getScrollScalar()
  {
    return this.clamp(this.y + this.limitOffset, 800, 1600);
  }

  update() {
    this.bulletTimer++;
    this.sprite.setPosition(this.x, this.y);
    var that = this;
    this.bullets.forEach(function(element) {
      element.update();
      if(element.dead) {
        that.bullets.splice( that.bullets.indexOf(element), 1 );
      }
    });
  }

  draw() {
    this.sprite.draw();
    this.bullets.forEach(function(element) {
      element.draw();
    });

  }
  /**
   * 
   * @param {*} val The value to clamp
   * @param {*} min The minimum value of val
   * @param {*} max The maximum value of val
   */
  clamp(val, min, max)
  {
    return Math.max(min, Math.min(max, val));
  }
}
