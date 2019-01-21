class Level
{
    constructor()
    {
        this.worldTile = new WorldTile(0, -54000);
    }

    update()
    {
        this.worldTile.update();
    }

    draw()
    {
        this.worldTile.draw();
    }

}

