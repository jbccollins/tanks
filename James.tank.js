importScripts('lib/tank.js');

// Don't know where to start?
// Read Getting Started in "Docs" section 

function getDistance(tankState, enemyState) {
  var a = tankState.x - enemyState.x;
  var b = tankState.y - enemyState.y;

  return Math.sqrt( a*a + b*b );
}

tank.init(function(settings, info) {
	// initialize tank here
});

tank.loop(function(state, control) {
  control.THROTTLE = 0.5;
  control.SHOOT = 0.1;
  control.TURN = 0;
  if(!state.radar.enemy) {
    control.RADAR_TURN = 1;
    var centerAngle = Math.deg.atan2(
      0 - state.y,
      0 - state.x
    );
    var tankAngleDelta = Math.deg.normalize(centerAngle - state.angle);
    control.TURN = tankAngleDelta * 1;
  } else {
    control.SHOOT = 1;
    var distance = getDistance(state, state.radar.enemy);
    console.log(distance);
    if (distance > 130) {
      control.THROTTLE = 1;
    	control.BOOST = 1;
    } else {
    	control.THROTTLE = 0;
    }

    // find target angle to aim the enemy
    var targetAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    );

    var radarAngleDelta = Math.deg.normalize(targetAngle - (state.radar.angle + state.angle));

    // adjust radar direction to follow the target
    control.RADAR_TURN = radarAngleDelta*1;

    var gunAngleDelta = Math.deg.normalize(targetAngle - (state.gun.angle + state.angle));
    
    // adjust radar direction to follow the target
    control.GUN_TURN = gunAngleDelta * 1;
    
    // Ram the enemy!!
    var tankAngleDelta = Math.deg.normalize(targetAngle - state.angle);
    control.TURN = tankAngleDelta * 1;

  }
});
