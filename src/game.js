class Game {
  constructor(title)
  {
    this.title = title;
    this.initWorld();
  }
  initWorld() {
    this.car = new Car(300, 600);
    this.levelPart1 = new Level();

    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
    this.input.bind(this.car.moveRight, "ArrowRight");
    this.input.bind(this.car.shoot, " ");
    this.input.bind(this.car.spill, "b");
    this.input.bind(this.car.shootRocket, "v");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);

    this.npcManager = new NPCManager(400, 1080);
    this.respawnTruck = new RespawnTruck(400,1000);
    this.levelPart1.init(-53000);
  }

  update(time) {

    this.levelPart1.update(this.car.getScrollScalar());
    this.car.update(this.levelPart1.getScrollSpeed(),this.npcManager.getHeliPositionX(),this.npcManager.getHeliPositionY(),this.npcManager.getHeliAlive());
    var curY = this.levelPart1.getYPosition() * -1;
    this.car.powerUp(this.npcManager.checkRocketGot());
    this.respawnTruck.update(this.levelPart1.getScrollSpeed(), curY)

    if(!this.car.getAlive() && this.respawnTruck.getOffscreen() && this.respawnTruck.getSpawning())
    {
      this.respawnTruck.setVelocity(-4);
      if (this.respawnTruck.checkPosition()){
        this.respawnTruck.setVelocity(0);
        this.car.reset(this.respawnTruck.getX(), this.respawnTruck.getY());
      }
    }
    if (this.car.getAlive()&& !this.car.getState()){
      this.car.reverseCar(this.respawnTruck.getY());
      this.respawnTruck.setOffscreen(false);

      if (this.car.getState())
      {
        this.respawnTruck.setVelocity(-6);
      }
    }

    if(this.levelPart1.getYPosition() > 1080)
    {
      this.levelPart1.init(-53000);
    }

    this.npcManager.update(this.car, this.levelPart1.getScrollSpeed());

    if (this.car.getState()){
      this.input.update();
    }

    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();

    if(this.car.health <= 0) {
      this.car.health = 3;
      this.car.reset(300, 600);
      this.levelPart1.reset(-53000);
      this.score_text.setScore(0);
      this.time_text.setTime(1000);
      this.car.explosionTime = false;
      this.npcManager.reset();
      gameNs.sceneManager.goToScene(gameNs.endScene.title);

    }

    console.log(this.car.getPositionX())
    
  }

  draw() {
    if(gameNs.game.ctx.globalAlpha < 1) {
      gameNs.game.ctx.globalAlpha += 0.01;
    }
    document.body.style.background = "#ffffff";
    this.levelPart1.draw();
    gameNs.game.collisionManager.render(gameNs.game.ctx);
    this.car.draw();
    this.npcManager.draw();
    this.score_text.drawText();
    this.time_text.drawText();
    this.respawnTruck.draw();
    this.score_text.drawText();
    this.time_text.drawText();
  }
}
