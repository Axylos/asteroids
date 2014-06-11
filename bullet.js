(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function () {
    Asteroids.MovingObject.call(this, arguments);
  }
  Bullet.prototype = Object.create(Asteroids.MovingObject.prototype);
  
})(this);