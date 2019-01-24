class Play
{
  constructor()
  {

  }

  initWorld()
  {
    gameNs.sceneManager = new SceneManager();
    gameNs.titleScene = new TitleScene("Title");
    gameNs.menuScene = new MenuScene("Menu");
    gameNs.helpScene = new Help("Help");
    gameNs.gameScene = new Game("Game");
    gameNs.tutorialScene = new Tutorial("Tutorial");
    gameNs.endScene = new End("End");

    gameNs.sceneManager.addScene(gameNs.titleScene);
    gameNs.sceneManager.addScene(gameNs.menuScene);
    gameNs.sceneManager.addScene(gameNs.gameScene);
    gameNs.sceneManager.addScene(gameNs.tutorialScene);
    gameNs.sceneManager.addScene(gameNs.helpScene)
    gameNs.sceneManager.addScene(gameNs.endScene)

    gameNs.sceneManager.goToScene(gameNs.menuScene.title);
    this.update = this.update.bind(this);
  }

  update()
  {

    gameNs.sceneManager.update();
    //gameNs.sceneManager.draw();
  }

  draw()
  {

    gameNs.sceneManager.draw()

  }
}
