(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});;
  
  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }
  Asteroid.prototype = Object.create(Asteroids.MovingObject.prototype);
  
  Asteroid.COLOR = "pink";
  Asteroid.RADIUS = 45;
  
  Asteroid.randomAsteroid = function(dimX, dimY, ship) {
    var pos = {x: Math.random() * dimX, y: Math.random() * dimY};
    var vel = {x: Math.random() * 3, y: Math.random() * 3};
    var newAsteroid = new Asteroid(pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
    
    if(ship.isCollidedWith(newAsteroid)) {
      return Asteroid.randomAsteroid(dimX, dimY, ship);
    } else {
      return newAsteroid;
    }
  };
  
})(this);