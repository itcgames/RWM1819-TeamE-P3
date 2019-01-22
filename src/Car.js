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
  }

  moveUp() {
    if(this.y > 10)
      this.y -= 4;
  }

  moveDown() {
    if(this.y < 800)
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
      this.bullets.push(new Bullet(this.x + 11, this.y));
      this.bulletTimer = 0;
    }

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
}
