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
var max_enemies = 20;
var lives = 3;
var num_bracelets = 3;
var bracelets_won = 0;
var bankroll = 0;
var v_bankroll = 0;
var background_music = new Audio('images/thrones.mp3');
background_music.play();
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/vanessa.png';
    this.x = -ENEMY_WIDTH;  // sets bugs initial x-position off screen left
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
        player.sprite = 'images/jasonwins.png';
        background_music.pause();
        var wingame = new Audio('images/wingame.wav');
        wingame.play();
        wingame.volume = 0.2;
        player.x = 200;
        player.y = 200;
        lives = 0;
        v_bankroll = -1800000;
        document.getElementById('button').style.display = 'inline';
        // document.getElementById('button').removeAttribute('disabled');
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
    this.y = CANVAS_HEIGHT - 218 - BLOCK_HEIGHT / 2;  // initial y position of player
};

// draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
            this.reset();
            var death = new Audio('images/loselife.wav');
            if (lives > 1) {
            death.play();
        }

            // code to delay sound, use for endgame later

            // var timeoutID;
            // function delayedSound() {
            //     timeoutID = window.setTimeout(deathplay, 1000);
            // }
            // function deathplay() {
            //     death.play();
            // }
            // delayedSound();  //
            lives--;
            if (lives == 0) {
                background_music.pause();
                var gameover = new Audio('images/gameover.wav');
                gameover.play();
                bankroll = -10000;
                v_bankroll = 10000;
                max_enemies = 180;
                for (var i = 0; i < max_enemies; i++) {
                    allEnemies.push(new Enemy());
                }
                document.getElementById('button').style.display = 'inline';
        }
    }
}
    // detect collisions between player and bracelet objects
    for (var i = 0, l = allBracelets.length; i < l; i++) {
        if (allBracelets[i].x < this.x + PLAYER_WIDTH - 30 &&
            allBracelets[i].x + ENEMY_WIDTH - 5 > player.x &&
            allBracelets[i].y < this.y + PLAYER_HEIGHT - 80 &&
            allBracelets[i].y + ENEMY_HEIGHT - 5 > this.y) {
                allBracelets[i].x = 2000;  // move bracelet off-canvas once hit
                allBracelets[i].y = 2000;
                var coin = new Audio('images/coin.wav');
                coin.play();
                this.reset();
                bracelets_won++;  // increment bracelets won variable once hit
                if (bracelets_won == 3) {
                    bankroll = 1800000;
                }
        }
    }
}
// return player to initial starting position whenever player.reset is called
Player.prototype.reset = function() {
    this.x = CANVAS_WIDTH / 2 - BLOCK_WIDTH / 2 + 10;
    this.y = CANVAS_HEIGHT - 218 - BLOCK_HEIGHT / 2;
}
// switch statement to handle key inputs from user.  Used to move player around the screen
Player.prototype.handleInput = function(key) {
    if (lives > 0) {
    switch (key) {
        case 'left':
            if (this.x > BLOCK_WIDTH / 2) {
            this.x -= BLOCK_WIDTH;
        }
            break;
        case 'up':
            if (this.y > BLOCK_HEIGHT / 2) {
            this.y -= BLOCK_HEIGHT;
        }
            break;
        case 'right':
            if (this.x < BLOCK_WIDTH * 10) {
            this.x += BLOCK_WIDTH;
        }
            break;
        case 'down':
            if (this.y < BLOCK_HEIGHT * 6) {
            this.y += BLOCK_HEIGHT;
        }
            break;
    }
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < max_enemies; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();
var bracelet = new Bracelet();
var allBracelets = [];
    for (var i = 0; i < num_bracelets; i++) {
        allBracelets.push(new Bracelet());
    }

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

function newGame() {
    document.getElementById('button').style.display = 'none';
    player.sprite = 'images/jason.png';
    player.reset();
    background_music.currentTime = 0;
    background_music.play();
    allEnemies = [];
    allBracelets = [];
    lives = 3;
    bankroll = 0;
    v_bankroll = 0;
    bracelets_won = 0;
    max_enemies = 20;
    num_bracelets = 3;
    for (var i = 0; i < num_bracelets; i++) {
        allBracelets.push(new Bracelet());
    }
    for (var i = 0; i < max_enemies; i++) {
        allEnemies.push(new Enemy());
    }

}
