/**
 * @author James Condon
 * C00207200
 * The game scene class which is a child of the scene class
 */
class MenuScene
{
/**
  * @param {title} string title of the MenuScene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.gs = new GestureManager();
    this.gs.init()
    this.title = title;
    this.startText = "0 Start Game"
    this.tutorialText = "1 Tutorial"
    this.input = new Input();
    this.input.bind(this.changeScene, "0");
    this.input.bind(this.changeScene2, "1");
  }
  update()
  {
    this.input.update();
    if (this.gs.touchColl(400, 300, 500, 100)){
      this.changeScene();
    }

    if (this.gs.touchColl(400, 600, 500, 100)){
      
    }
  }

  is_touch_device(){
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");

    if (generalTouchEnabled) {
        return true;
    }
    return false;
  }

  changeScene()
  {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.sceneManager.goToScene(gameNs.gameScene.title);
    //gameNs.game.ctx.clearRect(0, 0, 1000, 1000);
  }
  changeScene2()
  {
    gameNs.tutorial = true;
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.sceneManager.goToScene(gameNs.tutorialScene.title);
    //gameNs.game.ctx.clearRect(0, 0, 1000, 1000);
  }
/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw()
  {


    document.body.style.background = "#000000";
    gameNs.game.ctx.font = '120px Spy Hunter'; //48
    gameNs.game.ctx.fillStyle = "white"
    gameNs.game.ctx.fillText("SPY HUNTER", 300, 150);
    gameNs.game.ctx.font = '80px Spy Hunter'; //48
    gameNs.game.ctx.globalAlpha = 0.02;
    gameNs.game.ctx.fillStyle = "yellow"
    gameNs.game.ctx.fillText(this.startText, 400, 400);
    if (!this.is_touch_device()){
      gameNs.game.ctx.fillStyle = "green"
      gameNs.game.ctx.fillText(this.tutorialText, 400, 700);
    }

}


}
