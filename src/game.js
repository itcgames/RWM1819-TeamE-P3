class Game {
  constructor(title)
  {
    this.title = title;
    this.initWorld();
  }
  initWorld() {
    this.car = new Car(100, 100);
    this.levelPart1 = new Level(-53000);
    this.levelPart2 = new Level(-106000);
    this.motorCycle = new MotorCycle(400, 600);
    this.truck = new Truck(400, 100);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
    this.input.bind(this.car.moveRight, "ArrowRight");
    this.input.bind(this.car.shoot, " ");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);
  }

  update(time) {
    this.car.update();
    this.levelPart1.update(this.car.getScrollScalar());
    this.levelPart2.update(this.car.getScrollScalar());
    this.input.update();
    this.motorCycle.update();
    this.truck.update();
    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();
  }

  draw() {
    document.body.style.background = "#ffffff";
    this.levelPart1.draw();
    this.levelPart2.draw();
    this.car.draw();
    this.motorCycle.draw();
    this.truck.draw();
    this.score_text.drawText();
    this.time_text.drawText();
    gameNs.game.collisionManager.render(gameNs.game.ctx);
    this.motorCycle.draw();
  }
}
