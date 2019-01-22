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

        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("../assets/SpyHunterArea01.png"),
                                768,
                                18049,
                                0,
                                0,
                                this.x,
                                this.y,
                                gameNs.game.ctx);

        this.sprite.setScale(3.0, 3.0);
    }

    update()
    {
        //TODO increment y position using a function of the player's velocity.
        this.y += 20;
        this.sprite.setPosition(this.x, this.y);
    }

    draw()
    {
        this.sprite.draw();
    }
}
