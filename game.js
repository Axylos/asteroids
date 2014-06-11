(function(root) {
  "use strict";

  var Asteroids = root.Asteroids = (root.Asteroids || {});;
  
  var Game = Asteroids.Game = function(context, dim_x, dim_y) {
    var new_asteroid, test_asteroid;
    this.context = context;
    this.DIM_X = dim_x;
    this.DIM_Y = dim_y;
    this.ship = new Asteroids.Ship({x: dim_x / 2, y: dim_y / 2});
    this.asteroids = [];
    for (var i = 0; i < 20; i++) {
      test_asteroid = Asteroids.Asteroid.randomAsteroid(dim_x, dim_y);
      new_asteroid = Asteroids.Asteroid.randomAsteroid(dim_x, dim_y);
      this.asteroids.push(new_asteroid);
    }
  }
  
  Game.prototype.render = function() {
    var context = this.context
    context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ship.render(context);
    this.asteroids.forEach(function (asteroid) {
      asteroid.render(context);
    });
  }
    
  Game.prototype.move = function() {
    this.asteroids.forEach(function (asteroid, i) {
      asteroid.move(this.DIM_X, this.DIM_Y);
      if (   asteroid.pos.x < asteroid.radius * -1 
          || asteroid.pos.x > this.DIM_X + asteroid.radius
          || asteroid.pos.y < asteroid.radius * -1
          || asteroid.pos.y > this.DIM_Y + asteroid.radius) {
        this.asteroids = this.asteroids.slice(0, i).concat(this.asteroids.slice(i + 1));
      }
    }.bind(this));
    
    
    this.handleInputs();
    this.ship.move(this.DIM_X, this.DIM_Y);
  }
  
  Game.prototype.step = function() {
    this.move();
    this.render();
    this.checkCollisions();
  }
  
  Game.prototype.start = function(interval) {
    this.gameIntervalId = setInterval(this.step.bind(this), interval);
  }
  
  Game.prototype.checkCollisions = function() {
    var that = this;
    if (this.asteroids.some(function (asteroid) {
      return asteroid.isCollidedWith(that.ship);
    })) {
      alert("You suck. Realy hard. And the game's over. Okay. Great. Super duper. Stop. Don't.");
      clearInterval(this.gameIntervalId);
    }
  }
  
  Game.prototype.handleInputs = function() {
    var ship = this.ship;
    
    if(key.isPressed("up")) {
      ship.power(0.4);
    }
    
    if(key.isPressed("down")) {
      ship.power(-0.4);
    }
    
    if(key.isPressed("left")) {
      ship.heading += 0.1;
    }
    
    if(key.isPressed("right")) {
      ship.heading -= 0.1;
    }
    
  }
  
})(this);