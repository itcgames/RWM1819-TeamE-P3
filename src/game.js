class Game {
  constructor() {
  }

  init() {
    this.car = new Car(100, 100);
    this.worldTile = new WorldTile(0, -54000);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
  	this.input.bind(this.car.moveRight, "ArrowRight");
    this.score_text = new scoreText(100,900);
    this.time_text = new timeText(500,900);
  }

  update(weed) {
    this.car.update();
    this.worldTile.update();
    this.score_text.addScore(1);
    this.time_text.minusTime(1);
  }

  draw() {
    gameNs.game.ctx.clearRect(0,0,1800,1800);
    this.worldTile.draw();
    this.car.draw();
    this.score_text.drawText();
    this.time_text.drawText();
  }
}
