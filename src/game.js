class Game {
  constructor(title)
  {
    this.title = title;
    this.initWorld();
  }
  initWorld() {
    this.car = new Car(300, 600);
    this.levelPart1 = new Level();
    this.gsManager = new GSHANDLER();
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
    this.levelPart1.init(-53000);

    
  }
  
  is_touch_device(){
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
 
    if (generalTouchEnabled) {
        return true;
    }
    return false;
  }

  update(time) {

    this.levelPart1.update(this.car.getScrollScalar());
    this.car.update(this.levelPart1.getScrollSpeed(),this.npcManager.getHeliPositionX(),this.npcManager.getHeliPositionY(),this.npcManager.getHeliAlive());
    var curY = this.levelPart1.getYPosition() * -1;
    this.car.powerUp(this.npcManager.checkRocketGot());

    if(this.levelPart1.getYPosition() > 0)
    {
      this.levelPart1.init(-53000);
    }

    this.npcManager.update(this.car, this.levelPart1.getScrollSpeed(), curY);

    if (this.car.getState()){
      this.input.update();
    }
    if (this.is_touch_device()){
    this.gsManager.update(this.car);
    }
    this.score_text.addScore(1);
    this.time_text.minusTime(1);
    gameNs.game.collisionManager.checkAllColliders();

    if(this.car.health <= 0) {
      gameNs.game.score = this.score_text.score;
      gameNs.game.time = this.time_text.time;
      this.car.health = 3;
      this.car.reset(300, 600);
      this.levelPart1.reset(-53000);
      this.score_text.setScore(0);
      this.time_text.setTime(1000);
      this.car.explosionTime = false;
      this.npcManager.reset();
      this.car.ready = true;
      gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
      gameNs.sceneManager.goToScene(gameNs.endScene.title);
      
    }
    
  }

  draw() {
    if(gameNs.game.ctx.globalAlpha < 1) {
      gameNs.game.ctx.globalAlpha += 0.01;
    }
    document.body.style.background = "#ffffff";
    this.levelPart1.draw();
    //gameNs.game.collisionManager.render(gameNs.game.ctx);
    this.car.draw();
    this.npcManager.draw();
    this.score_text.drawText();
    this.time_text.drawText();
    this.score_text.drawText();
    this.time_text.drawText();
    if (this.is_touch_device())
    {
      this.gsManager.draw();
    }
    
  }
}
