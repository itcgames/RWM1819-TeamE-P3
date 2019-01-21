/**
 * main is the entry point for Javascript programs.
 * the game functions are called here.
 */

     lastFrameTimeMs = 0,
     maxFPS = 30,
     delta = 0,
     timestep = 1000 / 60;
     var gameNs = {};


function main() {
  document.title = "Team E";
  const game = new Game();
  gameNs.game = game;
  gameNs.game.assetManager = new AssetManager();
  gameNs.game.assetManager.queueDownload("../assets/spyhuntersheet.png");
  gameNs.game.assetManager.queueDownload("../assets/roadTileStraight.png");
  gameNs.game.assetManager.downloadAll(function()
  {
    initCanvas();
    gameNs.game.init();
    gameNs.game.update();
  });

}

/**
 * mainLoop is game loop for the project.
 * draw is called every frame.
 */
 function mainLoop(timestamp) {
     // Throttle the frame rate.
     if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
         requestAnimationFrame(mainLoop);
         return;
     }
     delta += timestamp - lastFrameTimeMs;
     lastFrameTimeMs = timestamp;

     var numUpdateSteps = 0;
     while (delta >= timestep) {
         gameNs.game.update(timestep);
         delta -= timestep;
         if (++numUpdateSteps >= 240) {
             panic();
             break;
         }
     }
     gameNs.game.draw();

     requestAnimationFrame(mainLoop);
 }

 requestAnimationFrame(mainLoop);

 /**
  * Initialises the canvas - the drawing surface. The canvas
  * is added to the document. When a HTML document is loaded into a
  * browser, it becomes a document object. This document object is
  * the root node of the HTML document and is considered the 'owner' of all other
  * nodes such as forms, buttons, the canvas etc.
  */

 function initCanvas() {
 	// Use the document object to create a new element canvas.
 	var canvas = document.createElement('canvas');
 	// Assign the canvas an id so we can reference it elsewhere.
 	canvas.id = 'canvas';
 	canvas.width = window.innerWidth;
 	canvas.height = window.innerHeight;
 	// We want this to be a 2D canvas.
 	gameNs.game.ctx = canvas.getContext("2d");
 	// Adds the canvas element to the document.
 	document.body.appendChild(canvas);

	window.addEventListener("keydown", function(e) {
    // Space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
 }
