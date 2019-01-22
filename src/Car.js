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

    this.collider = new PolygonCollider([new Vector2(this.x, this.y),
                                             new Vector2(this.x + 25, this.y),
                                             new Vector2(this.x + 25, this.y + 45),
                                             new Vector2(this.x, this.y + 45)],
                                             ["Player"],
                                             ["bullet"]
                                             );
    gameNs.game.collisionManager.addPolygonCollider(this.collider);
  }

  moveUp() {
    if(this.y > 10)
    {
      this.y -= 4;
      this.collider.shape.move(0,-4);
    }
  }

  moveDown() {
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
      this.bullets.push(new Bullet(this.x + 11, this.y));
      this.bulletTimer = 0;
    }

  }

  update() {
    var collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
    if (CollisionManager.CollidedWithTag(CollisionManager.IndexOfElement(gameNs.game.collisionManager.polygonColliderArray, this.collider), collisionResults, gameNs.game.collisionManager.polygonColliderArray, 'bounds')) {
      console.log("HITTTTT");
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
  }

  draw() {
    this.sprite.draw();
    this.bullets.forEach(function(element) {
      element.draw();
    });

  }
}
