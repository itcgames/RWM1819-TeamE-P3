/**
 * @class MotorCycle
 * inherits from EnemyVehicle base type
 */
class MotorCycle extends EnemyVehicle
{
    constructor(x, y)
    {
        super();
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/spyhuntersheet.png"),
                                23,
                                32,
                                168,
                                152,
                                this.x,
                                this.y,
                                gameNs.game.ctx);
    }

    update()
    {
        this.sprite.rotate(2);
    }

    draw()
    {
        this.sprite.draw();
    }
}