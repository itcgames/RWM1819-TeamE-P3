class Game {
  constructor(title)
  {
    this.title = title;
    this.initWorld();
  }
  initWorld() {
    this.car = new Car(100, 100);
    this.level = new Level();
    this.motorCycle = new MotorCycle(200, 100);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
    this.input.bind(this.car.moveRight, "ArrowRight");
    this.input.bind(this.car.shoot, " ");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);
  }

  draw() {
    gameNs.game.ctx.clearRect(0,0,1800,1800);
    this.input.bind(this.car.shoot, " ");
    this.score_text = new scoreText(100,900);
    this.time_text = new timeText(500,900);
  }

  update(time) {
    this.car.update();
    this.level.update(this.car.getScrollScalar());
    this.input.update();

    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();
  }

  draw() {
    document.body.style.background = "#ffffff";
    this.level.draw();
    this.car.draw();
    this.motorCycle.draw();
    this.score_text.drawText();
    this.time_text.drawText();
    gameNs.game.collisionManager.render(gameNs.game.ctx);
  }
}
