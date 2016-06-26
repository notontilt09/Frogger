'use strict';

// initialize variables to be used
var CANVAS_WIDTH = 1110;
var CANVAS_HEIGHT = 808;
var BLOCK_WIDTH = 101;
var BLOCK_HEIGHT = 83;
var PLAYER_HEIGHT = 101;
var PLAYER_WIDTH = 101;
var ENEMY_WIDTH = 101;
var ENEMY_HEIGHT = 75;
var max_enemies = 15;
var lives = 5;
var num_bracelets = 3;
var bracelets_won = 0;
var bankroll = 0;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/vanessa.png';
    this.x = -ENEMY_WIDTH;;  // sets bugs initial x-position off screen left
    this.y = BLOCK_HEIGHT + (BLOCK_HEIGHT * Math.floor(Math.random() * 3) + 52);  // sets bugs initial y position in center of one of the three rows at random
    this.speed = Math.floor(Math.random() * 500);  // sets random speed of bug
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset bug position once it has crossed the screen
    if (this.x > CANVAS_WIDTH) {
        this.x = -ENEMY_WIDTH;
        this.y = BLOCK_HEIGHT + (BLOCK_HEIGHT * Math.floor(Math.random() * 5) + 52);
        this.speed = Math.floor(Math.random() * 500);
    }

    if (bankroll === 1800000) {
        allEnemies = [];
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/jason.png';
    this.x = CANVAS_WIDTH / 2 - BLOCK_WIDTH / 2 + 10;  // initial x position of player
    this.y = CANVAS_HEIGHT - 135 - BLOCK_HEIGHT / 2;  // initial y position of player
};

// draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
    // increase score and return player to starting position if player makes it to the water
    if (this.y < BLOCK_HEIGHT) {
        this.reset();
    }

    // detect collisions between player and all enemy objects
    for (var i = 0, l = allEnemies.length; i < l; i++) {
        if (allEnemies[i].x < this.x + PLAYER_WIDTH - 30 &&
            allEnemies[i].x + ENEMY_WIDTH - 5 > this.x &&
            allEnemies[i].y < this.y + PLAYER_HEIGHT - 80 &&
            allEnemies[i].y + ENEMY_HEIGHT - 5 > this.y) {
            player.reset();
            lives--;
            if (lives == 0) {
                bankroll = -10000;
                lives = 5;
                max_enemies = 200;
                for (var i = 0; i < max_enemies; i++) {
                    allEnemies.push(new Enemy());
                }
        }
    }
};
}
// return player to initial starting position whenever player.reset is called
Player.prototype.reset = function() {
    this.x = CANVAS_WIDTH / 2 - BLOCK_WIDTH / 2 + 10;
    this.y = CANVAS_HEIGHT - 135 - BLOCK_HEIGHT / 2;
}
// switch statement to handle key inputs from user.  Used to move player around the screen
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > BLOCK_WIDTH / 2) {
            this.x -= BLOCK_WIDTH
        }
            break;
        case 'up':
            if (this.y > BLOCK_HEIGHT / 2) {
            this.y -= BLOCK_HEIGHT;
        }
            break;
        case 'right':
            if (this.x < BLOCK_WIDTH * 10) {
            this.x += BLOCK_WIDTH
        }
            break;
        case 'down':
            if (this.y < BLOCK_HEIGHT * 7) {
            this.y += BLOCK_HEIGHT;
        }
            break;
    }
};

// bracelet object to collect
var Bracelet = function() {
    this.sprite = 'images/bracelet.png';
    this.x = 10 + (BLOCK_WIDTH * (Math.floor(Math.random() * 10)));
    this.y =  (1.5 * BLOCK_HEIGHT + 10) + (BLOCK_HEIGHT * Math.floor(Math.random() * 5));
};

// draw bracelets on canvas
Bracelet.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Bracelet.prototype.update = function(dt) {
 // Remove bracelets from canvas if player collides with them
   for (var i = 0; i < allBracelets.length; i++) {
        if (allBracelets[i].x < player.x + PLAYER_WIDTH - 30 &&
            allBracelets[i].x + ENEMY_WIDTH - 5 > player.x &&
            allBracelets[i].y < player.y + PLAYER_HEIGHT - 80 &&
            allBracelets[i].y + ENEMY_HEIGHT - 5 > player.y) {
                allBracelets[i].x = 2000;  // move bracelet off-canvas once hit
                allBracelets[i].y = 2000;
                bracelets_won++;  // increment bracelets won variable once hit
                if (bracelets_won == 3) {
                    bankroll = 1800000;
                }
        }
}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < max_enemies; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();
var bracelet = new Bracelet();
var allBracelets = [];
    for (var i = 0; i < num_bracelets; i++) {
        allBracelets.push(new Bracelet());
    };








// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
