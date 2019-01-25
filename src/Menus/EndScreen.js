class End
{
  constructor(title)
  {
    this.title = title;
    this.gs = new GestureManager();
    this.gs.init();
    if (this.is_touch_device()){
      this.startText = "Touch To Restart Game"
    }
    else {
      this.startText = "R To Restart Game"
    }
    
    this.input = new Input();
    this.input.bind(this.changeScene, "r");
  }

  is_touch_device(){
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");

    if (generalTouchEnabled) {
        return true;
    }
    return false;
  }

  update()
  {
    this.input.update();
    if (this.gs.touchColl(250, 400, 1000 , 100)) {
      this.changeScene();
    }
  }

  changeScene()
  {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.startDate = new Date();
    gameNs.sceneManager.goToScene(gameNs.gameScene.title);
    //gameNs.game.ctx.clearRect(0, 0, 1000, 1000);
  }
/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw() {
    this.scoreText = "Score: " + gameNs.game.score;
    this.timeText = "Time: " + gameNs.game.timePassed;
    document.body.style.background = "#000000";
    gameNs.game.ctx.font = '120px Spy Hunter'; //48
    gameNs.game.ctx.fillStyle = "white"
    gameNs.game.ctx.fillText("SPY HUNTER", 300, 150);
    gameNs.game.ctx.font = '80px Spy Hunter'; //48
    gameNs.game.ctx.fillStyle = "yellow"
    gameNs.game.ctx.fillText(this.startText, 250, 500);
    gameNs.game.ctx.fillText(this.scoreText, 450, 600);
    gameNs.game.ctx.fillText(this.timeText, 450, 700);
  }
}
