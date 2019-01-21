class Game {
  constructor() {
  }

  init() {
    this.car = new Car(450, 800);
    this.level = new Level();
    this.motorCycle = new MotorCycle(200, 100);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
  	this.input.bind(this.car.moveRight, "ArrowRight");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);
  }

  update() {
    this.car.update();
    this.level.update();
    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();
  }

  draw() {
    gameNs.game.ctx.clearRect(0,0,1800,1800);
    this.level.draw();
    this.car.draw();
    this.motorCycle.draw();
    this.score_text.drawText();
    this.time_text.drawText();
    gameNs.game.collisionManager.render(gameNs.game.ctx);
  }
}
