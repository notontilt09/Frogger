// initialize variables to be used
var canvas_width = 505;
var canvas_height = 606;
var block_width = 101;
var block_height = 83;
var player_height = 101;
var player_width = 101;
var enemy_width = 101;
var enemy_height = 171;
var max_enemies = 6;
var score = 0;
var lives = 5;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -enemy_width;;  // sets bugs initial x-position off screen left
    this.y = block_height + block_height * Math.floor(Math.random() * 3) - 20;  // sets bugs initial y position in center of one of the three rows at random
    this.speed = Math.floor(Math.random() * 300);  // sets random speed of bug
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset bug position once it has crossed the screen
    if (this.x > canvas_width) {
        this.x = -enemy_width;
        this.y = block_height + block_height * Math.floor(Math.random() * 3) - 20;
        this.speed = Math.floor(Math.random() * 300);
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
    this.sprite = 'images/harley.png';
    this.x = canvas_width / 2 - block_width / 2;  // initial x position of player
    this.y = canvas_height - 110 - block_height / 2;  // initial y position of player
};

// draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
    // increase score and return player to starting position if player makes it to the water
    if (this.y < block_height) {
        score++;
        if (score > 4) {
            score = 0;
            lives = 5;
            alert('YOU WIN!');  // create winning dialog box if score = 5
        }
        player.reset();
    }

    // detect collisions between player and all enemy objects
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < this.x + player_width - 30 &&
            allEnemies[i].x + enemy_width - 30 > this.x &&
            allEnemies[i].y < this.y + player_height - 80 &&
            allEnemies[i].y + enemy_height - 30 > this.y) {
            lives--;
            if (lives == 0) {
                lives = 5;
                alert('YOU LOSE'); // create losing dialog box if run out of lives
                score = 0;
            }
            player.reset();
        }
    }
};
// return player to initial starting position whenever player.reset is called
Player.prototype.reset = function() {
    this.x = canvas_width / 2 - block_width / 2;
    this.y = canvas_height - 110 - block_height / 2;
}
// switch statement to handle key inputs from user.  Used to move player around the screen
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > block_width / 2) {
            this.x -= block_width;
        }
            break;
        case 'up':
            if (this.y > block_height / 2) {
            this.y -= block_height;
        }
            break;
        case 'right':
            if (this.x < block_width * 4) {
            this.x += block_width;
        }
            break;
        case 'down':
            if (this.y < block_height * 5) {
            this.y += block_height;
        }
            break;
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
for (var i = 0; i < max_enemies; i++) {
    allEnemies.push(new Enemy());
};
var player = new Player();






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
