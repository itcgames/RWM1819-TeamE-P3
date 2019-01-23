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
        this.motorcycles = [];
        this.spikeCars = [];
        this.projectileCars = [];

        this.maxTrucks = 2;
        this.maxMotorcycles = 2;
        this.maxSpikeCars = 3;
        this.maxProjectileCars = 2;
    }

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
        }

        else if (rand === 4)
        {
            //spawn new projectle car
        }
    }

    //function that updates all NPC entities and spawns new ones.
    update(playerX)
    {
        var rand = Math.floor((Math.random() * 100) + 1);
        
        if(rand === 10)
        {
            console.log("Spawn vehicle");
            this.spawnVehicle(playerX);
        }
        
        for(var i = 0; i < this.trucks.length; i++)
        {
            this.trucks[i].update();
        }

        for(var i = 0; i < this.motorcycles.length; i++)
        {
            this.motorcycles[i].update();
        }

        for(var i = 0; i < this.spikeCars.length; i++)
        {
            
        }

        for(var i = 0; i < this.projectileCars.length; i++)
        {
            
        }
    }

    //Draws all NPC entities
    draw()
    {
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
            
        }

        for(var i = 0; i < this.projectileCars.length; i++)
        {
            
        }
    }

    
}
