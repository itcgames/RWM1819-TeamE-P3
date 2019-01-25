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
        this.respawnTrucks = [];
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

        this.respawnTrucks.push(new RespawnTruck(400,1000));
    }

    // Spawn functions for the tutorial.
    spawnPowerTruck(xPos)
    {
      this.powerTrucks.push(new PowerTruck(xPos, this.y));
    }
    spawnHelicopter()
    {
      this.helicopter.push(new Helicopter(-200, 600));
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
        var rand = Math.floor((Math.random() * 20) + 1);

        if(rand >= 1 && rand <= 5)
        {
            //Spawn new truck if there is room

            if(this.trucks.length < this.maxTrucks)
            {
                this.trucks.push(new Truck(xPos, this.y));

            }
        }

        else if (rand >= 5 && rand <= 10)
        {
            //spawn new motorcycle is there is room
            if(this.motorcycles.length < this.maxMotorcycles)
            {
                this.motorcycles.push(new MotorCycle(xPos, this.y));

            }
        }

        else if (rand >= 10 && rand <= 13)
        {
            //spawn new spike car
            if(this.spikeCars.length < this.maxSpikeCars)
            {
                this.spikeCars.push(new SpikeEnemy(xPos, this.y));
            }
        }

        else if (rand === 15)
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
    update(car, levelScrollSpeed, curY)
    {
        var rand = Math.floor((Math.random() * 60) + 1);

        //Update helicopter
        if(this.helicopter.length === 1)
        {
            this.helicopter[0].update(car.x, car.y,levelScrollSpeed);

            //Once the helicopter has completed its cycle, remove from memory
            if(this.helicopter[0].getPosition().y >= 1080)
            {
                gameNs.game.collisionManager.removePolygonCollider(this.helicopter[0].collider);
                this.helicopter.pop();
            }
        }

        if(this.helicopter.length === 0)
        {
            this.helicopterSpawnTicks += 1;
        }


        if(rand === 10 && gameNs.tutorial === false)
        {
            this.spawnVehicle(car.x);
        }

        for(var i = 0; i < this.trucks.length; i++)
        {
            this.trucks[i].update(levelScrollSpeed);
            if(!this.trucks[i].alive && this.trucks[i].y > 900)
            {
                console.log("REMOVING TRUCK");
                this.trucks.splice(i, 1);
            }
        }
        for(var i = 0; i < this.respawnTrucks.length; i++)
        {
            this.respawnTrucks[i].update(levelScrollSpeed, curY);
            if(!car.getAlive() && this.respawnTrucks[i].getOffscreen() && this.respawnTrucks[i].getSpawning())
            {
                this.respawnTrucks[i].setVelocity(-4);
                if (this.respawnTrucks[i].checkPosition()){
                    this.respawnTrucks[i].setVelocity(0);
                    car.reset(this.respawnTrucks[i].getX(), this.respawnTrucks[i].getY());
                }
            }

            if (car.getAlive()&& !car.getState()){
                car.reverseCar(this.respawnTrucks[i].getY());
                this.respawnTrucks[i].setOffscreen(false);

                if (car.getState())
                {
                  this.respawnTrucks[i].setVelocity(-6);
                }
              }
        }

        for(var i = 0; i < this.motorcycles.length; i++)
        {
            this.motorcycles[i].update(car.getPositionX(), levelScrollSpeed);
            if(!this.motorcycles[i].alive && this.motorcycles[i].y > 900)
            {
                console.log("REMOVING MOTORCYCLE");
                this.motorcycles.splice(i, 1);
            }
        }

        for(var i = 0; i < this.spikeCars.length; i++)
        {
            this.spikeCars[i].update(car.x, car.y, levelScrollSpeed, car.getAlive());
            console.log(this.spikeCars[i].y);
            if(!this.spikeCars[i].alive && this.spikeCars[i].y > 900)
            {
                console.log("REMOVING SPIKE");
                this.spikeCars.splice(i, 1);
            }
        }

        for(var i = 0; i < this.powerTrucks.length; i++)
        {
            this.powerTrucks[i].update(car.x, car.y, levelScrollSpeed, car.getAlive());
            if(this.powerTrucks[i].getDead())
            {
                gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].collider);
                gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderBigLeft);
                gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderBigRight);
                gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderTruck);
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
    getSpikeLength()
    {
      return this.spikeCars.length;
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

        for(var i = 0; i < this.respawnTrucks.length; i++)
        {
            this.respawnTrucks[i].draw();
        }
    }

    //function for emptying all containers when the game resets
    reset()
    {
        for(var i = 0; i < this.trucks.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.trucks[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.trucks[i].colliderBigLeft);
            gameNs.game.collisionManager.removePolygonCollider(this.trucks[i].colliderBigRight);

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
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderBigLeft);
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderBigRight);
            gameNs.game.collisionManager.removePolygonCollider(this.powerTrucks[i].colliderTruck);
        }
        this.powerTrucks = [];
        for(var i = 0; i < this.respawnTrucks.length; i++)
        {
            gameNs.game.collisionManager.removePolygonCollider(this.respawnTrucks[i].collider);
            gameNs.game.collisionManager.removePolygonCollider(this.respawnTrucks[i].truckBig);
        }
        this.respawnTrucks = [];
        this.respawnTrucks.push(new RespawnTruck(400,1000));
    }


}
