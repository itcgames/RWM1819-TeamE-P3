class Game {
  constructor() {
  }

  init() {
    this.car = new Car(100, 100);
    this.level = new Level();
    this.motorCycle = new MotorCycle(200, 100);
    this.input = new Input();
    this.input.bind(this.car.moveUp, "ArrowUp");
  	this.input.bind(this.car.moveDown, "ArrowDown");
  	this.input.bind(this.car.moveLeft, "ArrowLeft");
  	this.input.bind(this.car.moveRight, "ArrowRight");
  }

  update() {
    this.car.update();
    this.level.update();
  }

  draw() {
    //gameNs.game.ctx.clearRect(0,0,1800,1800);
    this.level.draw();
    this.car.draw();
    this.motorCycle.draw();
  }
}
