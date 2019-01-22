class Level
{
    constructor()
    {
        this.worldScale = 3;
        this.worldOffsetY = -53000;
        this.worldTile = new WorldTile(0, this.worldOffsetY);
        this.colliders = [];


        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 18000 * this.worldScale),
                                                 new Vector2(0 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 18000  * this.worldScale)],
                                                 ["bounds"]
                                                ));
        //R
        this.colliders.push(new PolygonCollider([new Vector2(222 * this.worldScale, this.worldOffsetY + 18000 * this.worldScale),
                                                 new Vector2(222 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(255 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(255 * this.worldScale, this.worldOffsetY + 18000  * this.worldScale)],
                                                 ["bounds"]
                                                 ));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(0 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(75 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 16125  * this.worldScale)],
                                                 ["bounds"]
                                                 ));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(225 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(175 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(256 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(256 * this.worldScale, this.worldOffsetY + 16125  * this.worldScale)],
                                                 ["bounds"]
                                                 ));


        for(var i = 0; i < this.colliders.length; i++)
        {
            gameNs.game.collisionManager.addPolygonCollider(this.colliders[i]);
        }
    }

    update()
    {
        this.worldTile.update();
        //Update collider positions
        this.updateColliders();
    }

    draw()
    {
        this.worldTile.draw();
    }

    updateColliders()
    {
        for(var i = 0; i < this.colliders.length; i++)
        {
            //TODO: move the y position by a function of the player's relative y position
            this.colliders[i].shape.move(0, 4);
        }
    }

}
