var minX = 0; //Minimum travesable location on x axis
var minY = 57; //Minimum traversable area on y axis (does not include water blocks as that will result in winning the game)
var maxX = 505; //Maximum travesable area on x axis 
var maxY = 386; //Maximum traversable area on y axis
var pStartLocX = 205; //Starting location of player on x axis
var pStartLocY = 385; //Strating location of player on y axis
var eStartLocX = -100; //Starting location of enemy on x Axis
var eStartLocY1 = 57; //Starting location of enemy on y Axis for first line
var eStartLocY2 = 139; //Starting location of enemy on y Axis for second line
var eStartLocY3 = 221; //Starting location of enemy on y Axis for third line
var winCounter = 0;

// Enemies our player must avoid
var Enemy = function(speed, yCord) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.location = {
        "x" : eStartLocX,
        "y" : yCord
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.location.x += this.speed * dt;
    if (this.location.x > (maxX + 100)) {
        this.location.x = eStartLocX;
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.location = {
        "x" : pStartLocX,
        "y" : pStartLocY
    };
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
};

Player.prototype.update = function() {
    detectCollision();
    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
};

//Moves player by one space as long as it will not result in running off the edge.
Player.prototype.handleInput = function(key) {
    if (key === "left") {
        if ((this.location.x - 100) > minX) {
            this.location.x -= 100;
        }
    }else if(key === "right") {
        if ((this.location.x + 100) < maxX) {
            this.location.x += 100;
        }
    }else if (key === "up") {
        if ((this.location.y - 82) >= minY) {
            this.location.y -= 82;    
        }else {
            win();
        }
        
    }else if (key === "down") {
        if ((this.location.y + 82) < maxY) {
            this.location.y += 82;    
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(50, eStartLocY1);
var enemy2 = new Enemy(150, eStartLocY1); 
var enemy3 = new Enemy(200, eStartLocY2); 
var enemy4 = new Enemy(100, eStartLocY2); 
var enemy5 = new Enemy(150, eStartLocY3);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

function detectCollision() {
    /* if allenemies loc - player loc < 100 or player loc - enemy loc < 100
    */
    for (var i = 0; i < allEnemies.length; i++) {
        //Touch determines if enemy and player are touching
        var touch = (((allEnemies[i].location.x - player.location.x < 100) && (allEnemies[i].location.x - player.location.x > -85)) && (allEnemies[i].location.y === player.location.y)); 

        if (touch){
            winCounter = 0;
            player.location.x = pStartLocX;
            player.location.y = pStartLocY;
        }
    }
};

function win() {
    winCounter += 1;
    window.alert("You win! You have won " + winCounter + " times without dying!");
    player.location.x = pStartLocX;
    player.location.y = pStartLocY;
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
