class Level
{
    //Level1 = -53000
    //Level2 = -106000;
    constructor(YOffset)
    {
        this.colliders = [];
    }

    reset(YOffset) {
        this.scrollSpeed = 0;
        this.worldScale = 3;
        //this.worldOffsetY = -53000;
        this.worldOffsetY = YOffset;
        this.worldTile = new WorldTile(0, this.worldOffsetY);
        
        this.initializeColliders();
    }

    init(YOffset)
    {
        this.scrollSpeed = 0;
        this.worldScale = 3;
        //this.worldOffsetY = -53000;
        this.worldOffsetY = YOffset;
        this.worldTile = new WorldTile(0, this.worldOffsetY);

        this.initializeColliders();
    }

    update(scrollScalar)
    {
        this.scrollSpeed = 1 / scrollScalar * 20000;
        this.worldTile.update(this.scrollSpeed);
        //Update collider positions
        this.updateColliders(this.scrollSpeed);
    }
    getScrollSpeed()
    {
      return this.scrollSpeed;
    }

    draw()
    {
        this.worldTile.draw();
    }

    updateColliders(scrollScalar)
    {
        for(var i = 0; i < this.colliders.length; i++)
        {
            //TODO: move the y position by a function of the player's relative y position
            this.colliders[i].shape.move(0, scrollScalar);
        }
    }

    initializeColliders()
    {   
        if(this.colliders.length > 0) {
            for(var i = 0; i < this.colliders.length; i++)
            {
                gameNs.game.collisionManager.removePolygonCollider(this.colliders[i]);
            }
        }

       this.colliders = [];
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 18000 * this.worldScale),
                                                 new Vector2(0 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 18000  * this.worldScale)],
                                                 ["bounds"],
                                                 ["bounds"]));
        //R
        this.colliders.push(new PolygonCollider([new Vector2(222 * this.worldScale, this.worldOffsetY + 18000 * this.worldScale),
                                                 new Vector2(222 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(255 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(255 * this.worldScale, this.worldOffsetY + 18000  * this.worldScale)],
                                                 ["bounds"],
                                                 ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(0 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(75 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(33 * this.worldScale, this.worldOffsetY + 16125  * this.worldScale)],
                                                 ["bounds"],
                                                 ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(225 * this.worldScale, this.worldOffsetY + 16125 * this.worldScale),
                                                 new Vector2(175 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(256 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                                                 new Vector2(256 * this.worldScale, this.worldOffsetY + 16125  * this.worldScale)],
                                                 ["bounds"],
                                                 ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 15675  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 15675 * this.worldScale),
                            new Vector2(175 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 15675  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(125 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 12280  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 12280 * this.worldScale),
                            new Vector2(222 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 12280  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(128 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(128 * this.worldScale, this.worldOffsetY + 11805  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(222 * this.worldScale, this.worldOffsetY + 11805 * this.worldScale),
                            new Vector2(222 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 11805  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(80 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(128 * this.worldScale, this.worldOffsetY + 10370  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(222 * this.worldScale, this.worldOffsetY + 10370 * this.worldScale),
                            new Vector2(175 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 10370  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(80 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(80 * this.worldScale, this.worldOffsetY + 9920  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 9920 * this.worldScale),
                            new Vector2(175 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9920  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(35 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(80 * this.worldScale, this.worldOffsetY + 9650  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 9650 * this.worldScale),
                            new Vector2(128 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9650  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(33 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(33 * this.worldScale, this.worldOffsetY + 9185  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(128 * this.worldScale, this.worldOffsetY + 9185 * this.worldScale),
                            new Vector2(128 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 9185  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(76 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(32 * this.worldScale, this.worldOffsetY + 6760  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(125 * this.worldScale, this.worldOffsetY + 6760 * this.worldScale),
                            new Vector2(175 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 6760  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 6315  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 6315 * this.worldScale),
                            new Vector2(175 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 6315  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(32 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(79 * this.worldScale, this.worldOffsetY + 3890  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(175 * this.worldScale, this.worldOffsetY + 3890 * this.worldScale),
                            new Vector2(222 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3890  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(16 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(32 * this.worldScale, this.worldOffsetY + 3440  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(222 * this.worldScale, this.worldOffsetY + 3440 * this.worldScale),
                            new Vector2(240 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3440  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(16 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(16 * this.worldScale, this.worldOffsetY + 3200  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(238 * this.worldScale, this.worldOffsetY + 3200 * this.worldScale),
                            new Vector2(238 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 3200  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //FORK
        this.colliders.push(new PolygonCollider([new Vector2(111 * this.worldScale, this.worldOffsetY + 3150 * this.worldScale),
                            new Vector2(111 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(143 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(143 * this.worldScale, this.worldOffsetY + 3150 * this.worldScale),
                            new Vector2(127 * this.worldScale, this.worldOffsetY + 3300 * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(30 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(16 * this.worldScale, this.worldOffsetY + 1960  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(238 * this.worldScale, this.worldOffsetY + 1960 * this.worldScale),
                            new Vector2(222 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1810 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1960  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 1800 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 1200 * this.worldScale),
                            new Vector2(45 * this.worldScale, this.worldOffsetY + 1200 * this.worldScale),
                            new Vector2(45 * this.worldScale, this.worldOffsetY + 1800  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(210 * this.worldScale, this.worldOffsetY + 1800 * this.worldScale),
                            new Vector2(210 * this.worldScale, this.worldOffsetY + 1200 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1200 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1800  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //FORK
        this.colliders.push(new PolygonCollider([new Vector2(97 * this.worldScale, this.worldOffsetY + 1800 * this.worldScale),
                            new Vector2(97 * this.worldScale, this.worldOffsetY + 1225 * this.worldScale),
                            new Vector2(157 * this.worldScale, this.worldOffsetY + 1225 * this.worldScale),
                            new Vector2(157 * this.worldScale, this.worldOffsetY + 1800  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
        //L
        this.colliders.push(new PolygonCollider([new Vector2(0 * this.worldScale, this.worldOffsetY + 1225 * this.worldScale),
                            new Vector2(0 * this.worldScale, this.worldOffsetY + 0 * this.worldScale),
                            new Vector2(30 * this.worldScale, this.worldOffsetY + 0 * this.worldScale),
                            new Vector2(30 * this.worldScale, this.worldOffsetY + 1225  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));

        //R
        this.colliders.push(new PolygonCollider([new Vector2(225 * this.worldScale, this.worldOffsetY + 1225 * this.worldScale),
                            new Vector2(225 * this.worldScale, this.worldOffsetY + 0 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 0 * this.worldScale),
                            new Vector2(256 * this.worldScale, this.worldOffsetY + 1225  * this.worldScale)],
                            ["bounds"],
                            ["bounds"]));
    

        for(var i = 0; i < this.colliders.length; i++)
        {
            gameNs.game.collisionManager.addPolygonCollider(this.colliders[i]);
        }
    }

    getYPosition()
    {
        return this.worldTile.getYPosition();
    }
    getXPosition()
    {
        return this.worldTile.getXPosition();
    }

}
