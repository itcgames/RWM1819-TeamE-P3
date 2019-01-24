class Tutorial {
  constructor(title)
  {
    this.title = title;
    this.made = false;
    console.log("CONSTRUCTED");
  }
  initWorld() {
    gameNs.tutorial = true;
    this.car = new Car(300, 600);
    this.levelPart1 = new Level();
    console.log("CALLED");
    this.input = new Input();

    this.arrowsMade = false;

    this.end = false;

    this.spawnedPowerUp = false;
    this.heliSpawned = false;

    this.carTime = false;
    this.carTime2 = false;

    this.heliTime = false;

    this.carCount = 0;

    this.rightPressed = this.rightPressed.bind(this);
    this.leftPressed = this.leftPressed.bind(this);
    this.downPressed = this.downPressed.bind(this);
    this.upPressed = this.upPressed.bind(this);

    this.input.bind(this.upPressed, "ArrowUp");
  	this.input.bind(this.downPressed, "ArrowDown");
  	this.input.bind(this.leftPressed, "ArrowLeft");
    this.input.bind(this.rightPressed, "ArrowRight");


    this.input.bind(this.car.shoot, " ");
    this.input.bind(this.car.spill, "b");
    this.input.bind(this.car.shootRocket, "v");
    this.score_text = new scoreText(100, 900);
    this.time_text = new timeText(500, 900);

    this.npcManager = new NPCManager(400, 1080);
    this.respawnTruck = new RespawnTruck(400,1000);
    this.levelPart1.init(-53000);

    this.goToMenu = this.goToMenu.bind(this);
    this.input.bind(this.goToMenu, "3");

    this.upPressed = false;
    this.downPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;

    //this.achievement = new Achievement("Tutorial Complete");
    //this.tutorialText = new tutorialText("Helloooooooooooooooooooooooo",100,100);
    //this.diamondAchievement = new DiamondAchievement("Diamond Got");
    //this.keyprompt = new KeyPrompt(100,600,"Space");
    //this.keyprompt2 = new KeyPrompt(300,567,"ArrowUp");
    //this.keyprompt3 = new KeyPrompt(300,600,"ArrowDown");
    //this.keyprompt4 = new KeyPrompt(267,600,"ArrowLeft");
    //this.keyprompt5 = new KeyPrompt(333,600,"ArrowRight");
    //this.arrow = new Arrow(1000,400,"right");
    //this.arrow2 = new Arrow(1000,400,"down");
    //this.arrow3 = new Arrow(1000,400,"left");
    //this.arrow4 = new Arrow(1000,400,"up");
    //this.highlight = new Highlight(300,400,400,300);
    //this.prompt = new Prompt(750,50,"rightClick");
    this.useArrowKeys();
  }
  useArrowKeys(){
    this.keyprompt2 = new KeyPrompt(300,467,"ArrowUp");
    this.keyprompt3 = new KeyPrompt(300,500,"ArrowDown");
    this.keyprompt4 = new KeyPrompt(267,500,"ArrowLeft");
    this.keyprompt5 = new KeyPrompt(333,500,"ArrowRight");
    this.tutorialText = new tutorialText("Use the arrow keys to move.",200,100);
  }
  checkArrowPressed()
  {
    if(this.rightPressed === true && this.leftPressed === true
      && this.upPressed === true && this.downPressed === true){
        return true;
      }else{
        return false;
      }
  }

  upPressed(){
    this.upPressed = true;
    this.input.bind(this.car.moveUp, "ArrowUp");
  }
  downPressed(){
    this.downPressed = true;
    this.input.bind(this.car.moveDown, "ArrowDown");
  }
  leftPressed(){
    this.leftPressed = true;
    this.input.bind(this.car.moveLeft, "ArrowLeft");
  }
  rightPressed(){
    this.rightPressed = true;
    this.input.bind(this.car.moveRight, "ArrowRight");
  }

  goToMenu(){
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
    gameNs.sceneManager.goToScene(gameNs.menuScene.title);
  }


  update(time) {
    if(this.carTime2 == true)
    {
      if(this.npcManager.getSpikeLength() == 0 && this.end == false)
      {
        this.end = true;
        this.tutorialText6 = new tutorialText("Congratulations!, Press 3 to return to the Main Menu.",10,100);
        this.diamondAchievement = new DiamondAchievement("Tutorial Complete!");
      }
    }
    if(this.heliTime === true && this.car.getArmed() === false && this.carTime2 === false)
    {
      if(this.carTime === false)
      {
      this.tutorialText4 = new tutorialText("Watch out for those spikes!",100,100);
      this.npcManager.spawnSpikeCar(this.car.getPositionX(),0);
      this.carTime = true;
    }
    if(this.carTime === true)
    {
      this.carCount = this.carCount + 1;
    }
    if(this.carCount >= 100 && this.carTime2 === false)
    {
      this.carTime = false;
      this.tutorialText5 = new tutorialText("Use space to shoot or ram them safely!",50,100);
      this.keyprompt = new KeyPrompt(50,300,"Space");
      this.carTime2 = true;
    }
    }
    if(this.checkArrowPressed() === true)
    {
      if(this.spawnedPowerUp === false)
      {
      this.npcManager.spawnPowerTruck(this.car.getPositionX());
      this.spawnedPowerUp = true;
      this.tutorialText2 = new tutorialText("Enter the back of a truck to receive a power up!",30,100);
      this.arrow = new Arrow(this.npcManager.getPowerTruckX() + 14,this.npcManager.getPowerTruckY() + 70,"up");
    }
    this.arrow.updatePositionX(this.npcManager.getPowerTruckX() + 14);
    this.arrow.updatePositionY(this.npcManager.getPowerTruckY()+ 70);
    }
    if(this.car.getArmed() === true)
    {
      if(this.heliSpawned === false)
      {
        this.npcManager.spawnHelicopter();
        this.tutorialText3 = new tutorialText("Press V to use your rocket on the Heli!",100,100);
        this.highlight = new Highlight(this.npcManager.getHeliPositionX() + 20,this.npcManager.getHeliPositionY() + 25
        ,200,200);
        this.heliSpawned = true;

        this.heliTime = true;
      }
    }
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

  }

  draw() {
    gameNs.game.ctx.clearRect(0,0,2400,2400);
    if(this.made === false){
    this.initWorld();
    this.made = true;
  }
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

    if(this.checkArrowPressed() === false)
    {
    this.tutorialText.drawText();
    this.keyprompt2.drawImage();
    this.keyprompt3.drawImage();
    this.keyprompt4.drawImage();
    this.keyprompt5.drawImage();
  }
  if(this.spawnedPowerUp)
  {
    if(this.car.getArmed() === false && this.heliTime === false)
    {
    this.tutorialText2.drawText();
    this.arrow.drawImage();
  }

  }
  if(this.heliTime === true && this.carTime === false && this.carTime2 === false)
  {
    console.log(this.carTime2);
    this.tutorialText3.drawText();
    this.highlight.drawImage();
    this.highlight.updatePositionX(this.npcManager.getHeliPositionX() + 20);
    this.highlight.updatePositionY(this.npcManager.getHeliPositionY() + 25);
  }
  if(this.carTime === true)
  {
    this.tutorialText4.drawText();
  }
  if(this.carTime2 === true && this.end === false)
  {
    this.tutorialText5.drawText();
    this.keyprompt.drawImage();
  }
  if(this.end === true)
  {
    this.tutorialText6.drawText();
    this.diamondAchievement.drawImage();
  }
    //this.diamondAchievement.drawImage();
    //this.arrow.drawImage();
    //this.arrow2.drawImage();
    //this.arrow3.drawImage();
    //this.arrow4.drawImage();
    //this.highlight.drawImage();
    //this.prompt.drawImage();
    //this.keyprompt5.drawImage();
  }
}
