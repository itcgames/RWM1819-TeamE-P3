class End
{
  constructor(title)
  {
    this.title = title;
    this.startText = "R To Restart Game"
    this.input = new Input();
    this.input.bind(this.changeScene, "r");
  }

  update()
  {
    this.input.update();
  }

  changeScene()
  {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.sceneManager.goToScene(gameNs.gameScene.title);
    //gameNs.game.ctx.clearRect(0, 0, 1000, 1000);
  }
/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw() {

    document.body.style.background = "#000000";
    gameNs.game.ctx.font = '120px Spy Hunter'; //48
    gameNs.game.ctx.fillStyle = "white"
    gameNs.game.ctx.fillText("SPY HUNTER", 300, 150);
    gameNs.game.ctx.font = '80px Spy Hunter'; //48
    gameNs.game.ctx.fillStyle = "yellow"
    gameNs.game.ctx.fillText(this.startText, 350, 500);
  }
}
