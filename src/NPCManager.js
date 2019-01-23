//Spawner for NPCs
class NPCManager
{
    /**
     *
     * @param {*} x: x position
     * @param {*} y: y position
     */
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.trucks = [];
        this.powerTrucks = [];
        this.motorcycles = [];
        this.spikeCars = [];
        this.projectileCars = [];
        this.helicopter = new Helicopter(-200, 500);
        this.powerTrucks.push(new PowerTruck(200,300));

        this.maxTrucks = 2;
        this.maxMotorcycles = 2;
        this.maxSpikeCars = 3;
        this.maxProjectileCars = 2;
    }

    //Spawns a new vehicle if there is room, at the X Position of the player
    /**
     *
     * @param {*} xPos: x position of the player's object.
     */
    spawnVehicle(xPos)
    {
        var rand = Math.floor((Math.random() * 4) + 1);

        if(rand === 1)
        {
            //Spawn new truck if there is room
            if(this.trucks.length < this.maxTrucks)
            {
                this.trucks.push(new Truck(xPos, this.y));

            }
        }

        else if (rand === 2)
        {
            //spawn new motorcycle is there is room
            if(this.motorcycles.length < this.maxMotorcycles)
            {
                this.motorcycles.push(new MotorCycle(xPos, this.y));

            }
        }

        else if (rand === 3)
        {
            //spawn new spike car
            if(this.spikeCars.length < this.maxSpikeCars)
            {
                this.spikeCars.push(new SpikeEnemy(xPos, this.y));

            }
        }

        else if (rand === 4)
        {
            //spawn new projectle car
        }
    }

    //function that updates all NPC entities and spawns new ones.
    /**
     *
     * @param {*} car car object
     * @param {*} levelScrollSpeed scroll speed gotten from the level object
     */
    update(car, levelScrollSpeed)
    {
        var rand = Math.floor((Math.random() * 100) + 1);
        //Update helicopter
        this.helicopter.update(car.x, car.y);

        if(rand === 10)
        {
            console.log("Spawn vehicle");
            this.spawnVehicle(car.x);
        }

        for(var i = 0; i < this.trucks.length; i++)
        {
            this.trucks[i].update(levelScrollSpeed);
        }

        for(var i = 0; i < this.motorcycles.length; i++)
        {
            this.motorcycles[i].update(car.getPositionX(), levelScrollSpeed);
        }

        for(var i = 0; i < this.spikeCars.length; i++)
        {
            this.spikeCars[i].update(car.x, car.y, levelScrollSpeed, car.getAlive());
        }

        for(var i = 0; i < this.powerTrucks.length; i++)
        {
            this.powerTrucks[i].update(car.x, car.y, levelScrollSpeed, car.getAlive());
        }

        for(var i = 0; i < this.projectileCars.length; i++)
        {

        }
    }

    //Draws all NPC entities
    draw()
    {
        this.helicopter.draw();

        for(var i = 0; i < this.trucks.length; i++)
        {
            this.trucks[i].draw();
        }

        for(var i = 0; i < this.motorcycles.length; i++)
        {
            this.motorcycles[i].draw();
        }

        for(var i = 0; i < this.spikeCars.length; i++)
        {
            this.spikeCars[i].draw();
        }

        for(var i = 0; i < this.powerTrucks.length; i++)
        {
            this.powerTrucks[i].draw();
        }

        for(var i = 0; i < this.projectileCars.length; i++)
        {

        }
    }


}
