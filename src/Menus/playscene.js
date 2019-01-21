class Game
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
    gameNs.gameScene = new PlayScene("Game");

    gameNs.sceneManager.addScene(gameNs.titleScene);
    gameNs.sceneManager.addScene(gameNs.menuScene);
    gameNs.sceneManager.addScene(gameNs.gameScene);
    gameNs.sceneManager.addScene(gameNs.helpScene)

    gameNs.sceneManager.goToScene(gameNs.gameScene.title);
    this.update = this.update.bind(this);
  }

  update()
  {
    gameNs.sceneManager.update();
    gameNs.sceneManager.render();
  }

  render()
  {
    gameNs.sceneManager.render()
  }
}
