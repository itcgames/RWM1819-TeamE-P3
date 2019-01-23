/**
 * @author James Condon
 * C00207200
 * The title scene class which is a child of the scene class
 */

class TitleScene
{
/**
  * @param {title} string title of the MenuScene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.title = title;
    this.timeOne = new Date().getTime();
    this.currentTime = null;
    this.newTime = null;
    this.x = 0;
    this.y = 0;
    this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyHunterSplash.jpg"),
                            768,
                            800,
                            0,
                            0,
                            this.x,
                            this.y,
                            gameNs.game.ctx);

    this.sprite.setScale(1.8, 1.5);

  }

  update()
  {
    this.newTime = new Date().getTime();
    this.currentTime = this.newTime - this.timeOne;


    if(this.currentTime > 5000)
    {
        this.ChangeScene();
    }

  }

  ChangeScene()
  {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.sceneManager.goToScene(gameNs.menuScene.title);
  }


  draw()
  {

    document.body.style.background = "#ffffff";
    this.sprite.draw();


  }

}
