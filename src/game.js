class Game {
  constructor(title)
  {
    this.title = title;
    this.initWorld();
  }
  initWorld() {
    this.car = new Car(100, 100);
    this.levelPart1 = new Level();
    this.levelPart2 = new Level();
    this.motorCycle = new MotorCycle(400, 600);
    this.spikeEnemy = new SpikeEnemy(400, 400);
    this.truck = new Truck(400, 100);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
    this.input.bind(this.car.moveRight, "ArrowRight");
    this.input.bind(this.car.shoot, " ");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);

    this.levelPart1.init(-53000);
    //this.levelPart2.init(-106000);
  }

  update(time) {

    this.car.update(this.levelPart1.getScrollSpeed());
    this.levelPart1.update(this.car.getScrollScalar());
    //this.levelPart2.update(this.car.getScrollScalar());

    if(this.levelPart1.getYPosition() > 1080)
    {
      this.levelPart1.init(-53000);
    }

    // if(this.levelPart2.getYPosition() > 1080)
    // {
    //   this.levelPart2.init(-106000);
    // }
    if (this.car.getAlive()){
      this.input.update();
    }

    this.motorCycle.update(this.car.getPositionX(),this.levelPart1.getScrollSpeed());
    this.spikeEnemy.update(this.car.getPositionX(),this.car.getPositionY(),this.levelPart1.getScrollSpeed(),this.car.getAlive());
    this.truck.update();
    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();
  }

  draw() {
    document.body.style.background = "#ffffff";
    this.levelPart1.draw();
    //this.levelPart2.draw();
    gameNs.game.collisionManager.render(gameNs.game.ctx);
    this.car.draw();
    this.motorCycle.draw();
    this.spikeEnemy.draw();
    this.truck.draw();
    this.score_text.drawText();
    this.time_text.drawText();

    this.motorCycle.draw();
  }
}
