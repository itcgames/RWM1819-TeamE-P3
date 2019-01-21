/**
 * @author brendanhorlick1997@gmail.com (Brendan Horlick)
 * date: 31/10/2018
 */
class timeText
{
  constructor(textX, textY) {
    var that = this;
    var ctx = document.getElementById("canvas").getContext("2d");
    this.time = 1000;
    this.textString = this.time;
    this.textX = textX;
    this.textY = textY;
    this.i = 0;
  }

  render(){}
  /**
   * Draws an image after it is loaded.
   */
  drawText(){
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "30px Spy Hunter";
  ctx.fillStyle = "#66ffff";
  ctx.textAlign = "left";
  var length = this.textString.length;

  ctx.fillText(this.textString, this.textX, this.textY);
  ctx.fillStyle = "#ffffff";
  ctx.fillText("TIME", this.textX, this.textY - 30);
  //ctx.globalCompositeOperation = "source-in";
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(this.textX, this.textY - 40, this.i, 400);
  //this.i = this.i + 2;
  }
  setTime(number)
  {
    this.time = number;
    this.textString = this.time;
  }
  addTime(number)
  {
    this.time = this.time + number;
    this.textString = this.time;
  }
  minusTime(number)
  {
    this.time = this.time - number;
    this.textString = this.time;
  }
}
