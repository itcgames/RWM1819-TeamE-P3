/**
 * @author James Condon
 * C00207200
 * The game scene class which is a child of the scene class
 */
class Help
{
/**
  * @param {title} string title of the MenuScene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.title = title

  }


  update()
  {


  }


/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw()
  {
    document.body.style.background = "#66F9FF";


    //ctx.fillText(this.title, 100,100);
  }


}
