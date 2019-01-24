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
        this.helicopter = []
        //this.helicopter.push(new Helicopter(-200, 500));
        //this.trucks.push(new Truck(300,400));
        this.helicopterSpawnTicks = 0;

        this.maxPowerTrucks = 1;
        this.maxTrucks = 2;
        this.maxMotorcycles = 2;
        this.maxSpikeCars = 2;
        this.maxProjectileCars = 2;
    }

    // Spawn functions for the tutorial.
    spawnPowerTruck(xPos)
    {
      this.powerTrucks.push(new PowerTruck(xPos, this.y));
    }
    spawnHelicopter()
    {
      this.helicopter.push(new Helicopter(-200, 500));
    }

    spawnSpikeCar(x,y)
    {
      this.spikeCars.push(new SpikeEnemy(x, y));
    }

    // Position functions for the tutorial.

    getPowerTruckX(){
      if(this.powerTrucks.length > 0)
      {
      return this.powerTrucks[0].getPositionX();
    }
    }
    getPowerTruckY(){
      if(this.powerTrucks.length > 0)
      {
      return this.powerTrucks[0].getPositionY();
    }
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
            if(this.powerTrucks.length < this.maxPowerTrucks)
            {
                this.powerTrucks.push(new PowerTruck(xPos, this.y));
            }
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
        if(this.helicopter.length === 1)
        {
            this.helicopter[0].update(car.x, car.y,levelScrollSpeed);

            //Once the helicopter has completed its cycle, remove from memory
            if(this.helicopter[0].getPosition().x >= 900)
            {
                this.helicopter.pop();
            }
        }

        if(this.helicopter.length === 0)
        {
            this.helicopterSpawnTicks += 1;
        }


        if(rand === 10 && gameNs.tutorial === false)
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
            if(this.powerTrucks[i].getDead())
            {
              this.powerTrucks.splice(i,1);
            }
        }



        //If there is no helicopter, create a new one.
        if(gameNs.tutorial === false)
        {
        if(this.helicopter.length === 0 && this.helicopterSpawnTicks > 700)
        {
            this.helicopter.push(new Helicopter(-200, 500));
            this.helicopterSpawnTicks = 0;
        }
      }
    }

    checkRocketGot(){
      for(var i = 0; i < this.powerTrucks.length; i++)
      {
          if (this.powerTrucks[i].getRocketBool() == true)
          {
            return true;
          }
      }
      return false;
    }
    getHeliPositionX(){
      if(this.helicopter.length === 1)
      {
      return this.helicopter[0].getPositionX();
    }
    }
    getHeliPositionY(){
      if(this.helicopter.length === 1)
      {
      return this.helicopter[0].getPositionY();
    }
    }
    getHeliAlive(){
      if(this.helicopter.length === 1)
      {
      return this.helicopter[0].getHeliAlive();
    }
    }

    //Draws all NPC entities
    draw()
    {
        if(this.helicopter.length === 1)
        {
            this.helicopter[0].draw();
        }

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

    //function for emptying all containers when the game resets
    reset()
    {
        for(var i = 0; i < this.trucks.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.trucks[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.trucks[i].truckBig);


        }
        this.trucks = [];
        for(var i = 0; i < this.motorcycles.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.motorcycles[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.motorcycles[i].colliderBigLeft);
            gameNs.game.collisionManager.removePolygonCollider(this.motorcycles[i].colliderBigRight);

        }
        this.motorcycles = [];
        for(var i = 0; i < this.spikeCars.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.spikeCars[i].colliderSpikeLeft);
            gameNs.game.collisionManager.removePolygonCollider(this.spikeCars[i].colliderSpikeRight);
            gameNs.game.collisionManager.removePolygonCollider(this.spikeCars[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.spikeCars[i].colliderBigRight);
            gameNs.game.collisionManager.removePolygonCollider(this.spikeCars[i].colliderBigLeft);

        }
        this.spikeCars = [];
        if(this.helicopter.length === 1)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.helicopter[0].collider);
            this.helicopter = [];
        }
        this.helicopterSpawnTicks = 0;
        for(var i = 0; i < this.powerTrucks.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderBig);
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderTruck);
        }
        this.powerTrucks = [];


    }


}
