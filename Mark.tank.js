importScripts('lib/tank.js');

// Don't know where to start?
// Read Getting Started in "Docs" section 

var turnDirection, turnTimer, moveTimer;

tank.init(function(settings, info) {
	// initialize tank here
  settings.SKIN = 'ocean';
  turnDirection = Math.random() < 0.5 ? .5 : -.5;
  turnTimer = Math.round(Math.randomRange(0, 30));
  moveTimer = Math.round(Math.randomRange(0, 30));
});

tank.loop(function(state, control) {
  
  control.DEBUG = moveTimer;
  if(state.radar.enemy) {
    control.SHOOT = 0.7;
    control.THROTTLE = 0;
    control.TURN = 0;
    moveTimer = -1;
    turnTimer = -1;
  }
  else if(state.collisions.wall || moveTimer <= 0) {
    turnTimer = Math.round(Math.randomRange(20, 50));
    moveTimer = Math.round(Math.randomRange(50, 150));
  }
  
  if(turnTimer >= 0) {
    turnTimer--;

    control.THROTTLE = 0;
    control.TURN = turnDirection;
  } 
  else if (moveTimer > 0) {
   	moveTimer--;
    
    control.THROTTLE = 1;
    control.TURN = 0;
  }
  else {
    control.THROTTLE = 0;
    control.TURN = 0;
  }
});