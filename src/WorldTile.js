class WorldTile
{
    /**
     * 
     * @param {*} x: position of the tile on the x plane
     * @param {*} y: position of the tile on the y plane
     */
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/roadTileStraight.png"),
                                600,
                                1200,
                                0,
                                0,
                                this.x,
                                this.y,
                                gameNs.game.ctx);
    }

    update()
    {
        this.y++;
        this.sprite.setPosition(this.x, this.y);
    }

    draw()
    {
        this.sprite.draw();
    }
}
