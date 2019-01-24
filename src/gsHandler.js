

class GSHANDLER
{
    constructor()
    {
        this.gs = new GestureManager();
        this.gs.init();
        this.UpArrow = new Image();
        this.UpArrow.rotate
        this.UpArrow.src = "../assets/upArrow.png";
        this.DownArrow = new Image();
        this.DownArrow.src = "../assets/downArrow.png";
        this.LeftArrow = new Image();
        this.LeftArrow.src = "../assets/leftArrow.png";
        this.RightArrow = new Image();
        this.RightArrow.src = "../assets/rightArrow.png";
        this.shootBtn = new Image();
        this.shootBtn.src = "../assets/actionbtn.png";
        this.oilBtn = new Image();
        this.oilBtn.src = "../assets/actionbtn.png";
        this.missileButton = new Image();
        this.missileButton.src = "../assets/actionbtn.png";
    }

    update(car)  {
        if (this.gs.touchColl(650,650,50,50) && this.gs.detection)
        {
            car.moveUp();
         
        }
        if (this.gs.touchColl(600,700,50,50) && this.gs.detection)
        {
            car.moveLeft();
            
        }
        if (this.gs.touchColl(700,700,50,50) && this.gs.detection)
        {
            car.moveRight();
           
        }
        if (this.gs.touchColl(650,750,50,50) && this.gs.detection)
        {
            car.moveDown();
         
        }

        if (this.gs.touchColl(500,700,50,50) && this.gs.detection)
        {
            car.shoot();
        }
        if (this.gs.touchColl(550,600,50,50) && this.gs.detection)
        {
            car.spill();
        }
        if (this.gs.touchColl(650,550,50,50) && this.gs.detection)
        {
            car.shootRocket();
        }
        
    }

    draw()
    {
        gameNs.game.ctx.drawImage(this.UpArrow,650,650,50,50);
        gameNs.game.ctx.drawImage(this.LeftArrow,600,700,50,50);
        gameNs.game.ctx.drawImage(this.RightArrow,700,700,50,50);
        gameNs.game.ctx.drawImage(this.DownArrow,650,750,50,50);
        gameNs.game.ctx.drawImage(this.shootBtn,500,700,50,50);
        gameNs.game.ctx.drawImage(this.oilBtn,550,600,50,50);
        gameNs.game.ctx.drawImage(this.missileButton,650,550,50,50);
    }
}