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
    //this.truck = new Truck(400, 100);
    this.motorCycle = new MotorCycle(400, 600);
    this.spikeEnemy = new SpikeEnemy(400, 400);
    this.truck = new Truck(400, 100);
    this.helicopter = new Helicopter(-200, 500);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
    this.input.bind(this.car.moveRight, "ArrowRight");
    this.input.bind(this.car.shoot, " ");
    this.input.bind(this.car.spill, "b");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);

    this.npcManager = new NPCManager(400, 1080);

    this.levelPart1.init(-53000);
  }

  update(time) {

    this.levelPart1.update(this.car.getScrollScalar());
    this.car.update(this.levelPart1.getScrollSpeed());

    if(this.levelPart1.getYPosition() > 1080)
    {
      this.levelPart1.init(-53000);
    }

    this.npcManager.update(this.car, this.levelPart1.getScrollSpeed());
    
    if (this.car.getAlive()){
      this.input.update();
    }

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
    this.npcManager.draw();
    this.score_text.drawText();
    this.time_text.drawText();

    this.score_text.drawText();
    this.time_text.drawText();
  }
}
