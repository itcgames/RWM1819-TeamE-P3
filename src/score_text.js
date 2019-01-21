/**
 * @author brendanhorlick1997@gmail.com (Brendan Horlick)
 * date: 31/10/2018
 */
class scoreText
{
  constructor(textX, textY) {
    var that = this;
    var ctx = document.getElementById("canvas").getContext("2d");
    this.score = 0;
    this.textString = this.pad(this.score,8);
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
  ctx.fillStyle = "#ffff00";
  ctx.textAlign = "left";
  var length = this.textString.length;

  ctx.fillText(this.textString, this.textX, this.textY);
  ctx.fillStyle = "#ffffff";
  ctx.fillText("SCORE", this.textX + 60, this.textY - 30);
  //ctx.globalCompositeOperation = "source-in";
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(this.textX, this.textY - 40, this.i, 400);
  //this.i = this.i + 2;
  }
  setScore(number)
  {
    this.score = number;
    this.textString = this.pad(this.score,8);
  }
  addScore(number)
  {
    this.score = this.score + number;
    this.textString = this.pad(this.score,8);
  }
  minusScore(number)
  {
    this.score = this.score - number;
    this.textString = this.pad(this.score,8);
  }
  pad(num, size) {
    var s = "00000000" + num;
    return s.substr(s.length-size);
}
}
