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

        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/level.png"),
                                768,
                                18049,
                                0,
                                0,
                                this.x,
                                this.y,
                                gameNs.game.ctx);

        this.sprite.setScale(3.0, 3.0);
    }

    update(scrollScalar)
    {
        //TODO increment y position using a function of the player's velocity.
        this.y += scrollScalar;
        this.sprite.setPosition(this.x, this.y);
    }

    draw()
    {
        this.sprite.draw();
    }

    getYPosition()
    {
        return this.y;
    }

    getXPosition()
    {
        return this.x;
    }
}
