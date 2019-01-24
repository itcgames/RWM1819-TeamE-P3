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
  const game = new Play();
  gameNs.game = game;
  gameNs.game.collisionManager = new CollisionManager();
  gameNs.game.assetManager = new AssetManager();
  gameNs.game.assetManager.queueDownload("../assets/spyhuntersheet.png");
  gameNs.game.assetManager.queueDownload("../assets/SpyHunterArea01.png");
  gameNs.game.assetManager.queueDownload("../assets/spyHunterSplash.jpg");
  gameNs.game.assetManager.queueDownload("../assets/bullet.png");
  gameNs.game.assetManager.queueDownload("../assets/touchpad.png");
  gameNs.game.assetManager.downloadAll(function()
  {
    initCanvas();
    gameNs.game.initWorld();
    gameNs.game.update();
    mainLoop();
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
             
             break;
         }
     }
     gameNs.game.update(timestep);
     gameNs.game.draw();
     requestAnimationFrame(mainLoop);
 }


 /**
  * Initialises the canvas - the drawing surface. The canvas
  * is added to the document. When a HTML document is loaded into a
  * browser, it becomes a document object. This document object is
  * the root node of the HTML document and is considered the 'owner' of all other
  * nodes such as forms, buttons, the canvas etc.
  */

 function initCanvas() {
 	// Use the document object to create a new element canvas.
 	gameNs.game.canvas = document.createElement('canvas');
 	// Assign the canvas an id so we can reference it elsewhere.
 	gameNs.game.canvas.id = 'canvas';
 	gameNs.game.canvas.width = window.innerWidth;
 	gameNs.game.canvas.height = window.innerHeight;
 	// We want this to be a 2D canvas.
 	gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
 	// Adds the canvas element to the document.
 	document.body.appendChild(gameNs.game.canvas);

	window.addEventListener("keydown", function(e) {
    // Space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
 }
