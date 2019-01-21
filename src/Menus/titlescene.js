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
    this.title = title
    this.timeOne = new Date().getTime()
    this.currentTime = null
    this.newTime = null


  }

  update()
  {
    this.newTime = new Date().getTime()
    this.currentTime = this.newTime - this.timeOne


    if(this.currentTime > 5000)
    {
        this.ChangeScene()
    }

  }

  ChangeScene()
  {
    gameNs.sceneManager.goToScene(gameNs.menuScene.title)
  }


  render()
  {

    document.body.style.background = "#ffffff";
    gameNs.game.ctx.font = '100px serif'; //48



  }

}
