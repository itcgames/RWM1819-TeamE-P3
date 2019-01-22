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

    this.spriteAnimation = new AnimatedSprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                                          42,
                                                          42,
                                                          0,
                                                          565,
                                                          x,
                                                          y,
                                                          gameNs.game.ctx);
    this.animation = new Animation("explosion", 0, 565, 42, 42, 6);
    this.animation.setFrameRate(150);
    this.spriteAnimation.setAnimation(this.animation);
    this.spriteAnimation.setScale(1.5,1.5)
    this.x = x;
    this.y = y;
    this.width = 26
    this.height = 44
    this.alive = true;
    this.bullets = [];
    this.explosionTime = false;
    this.count = 0;
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

    this.collider = new PolygonCollider([new Vector2(this.x, this.y),
      new Vector2(this.x + 25, this.y),
      new Vector2(this.x + 25, this.y + 45),
      new Vector2(this.x, this.y + 45)],
      ["Player"],
      ["bullet"]
      );

      gameNs.game.collisionManager.addPolygonCollider(this.collider);
  }
  getPositionX(){
    return this.x;
  }
  moveUp() {
    if(this.y > 10)
    {
      this.y -= 4;
      this.collider.shape.move(0,-4);
    }
  }

  moveDown() {
    if(this.y < this.lowerYLimit)
    if(this.y < 800)
    {
      this.y += 4;
      this.collider.shape.move(0,4);
    }
  }

  moveLeft() {
    this.x -= 2;
    this.collider.shape.move(-2,0);
  }

  moveRight() {
    this.x += 2;
    this.collider.shape.move(2,0);
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

  update(scrollSpeed) {
    var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
    if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds') && this.alive) {
      console.log("HITTTTT");
      this.animation.setLooped(true);
      this.alive = false;
      this.explosionTime = true;
    }
    this.bulletTimer++;
    this.sprite.setPosition(this.x, this.y);


    var that = this;
    this.bullets.forEach(function(element) {
      element.update();
      if(element.dead) {
        that.bullets.splice( that.bullets.indexOf(element), 1 );
      }
    });

    if (this.explosionTime){
      this.y += (scrollSpeed / 2);
      this.collider.shape.move(0, (scrollSpeed / 2))
      this.spriteAnimation.setPosition(this.x - (this.width / 2), this.y - (this.height / 2));
      this.spriteAnimation.playAnimation();
      this.count+= 1;
      console.log(this.count)
      if (this.count >= 32)
      {
        this.explosionTime = false;
      }
    }
    if (!this.explosionTime && !this.getAlive())
    {
      this.reset()

    }
  }

  reset()
  {
    this.x = 300;
    this.y = 600;
    this.collider.position = new Vector2(this.x, this.y)
    this.sprite.setPosition(this.x, this.y);
    this.count = 0;
    this.animation.setLooped(false)
    this.alive = true;
  }

  getAlive(){
    return this.alive;
  }

  draw() {
    if (this.alive){
      this.sprite.draw();
    }

    if (this.explosionTime){
      this.spriteAnimation.draw();
    }

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
