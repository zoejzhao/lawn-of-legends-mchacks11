
// unimplemented points system
let numbermowed = 0;
let mypoints = 0;

let lndir = "right"; // initial lawnmower direction
let grassArray = [];

// coordinates of sprites in spritesheet
const lawnDir = {
  right: [
    929, 0, 929, 396, 150, 62.5
  ],
  left: [
    0, 0, 929, 396, 150, 62.5
  ],
  up: [
    416, 416, 396, 1325, 62.5, 150
  ],
  down: [
    0, 436, 436, 1195, 62.5, 150
  ]
}

// starts game
function startGame() {
  grassArray1();
  theLawn.start();
  myLawnmower = new Lawnmower(localStorage.colour); // initializes lawnmower

}

// creates lawn
// currently fixed size
function grassArray1() {

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 7; j++) {
      newObj = new Grass([i, j], 75 * i, 75 * j);
      grassArray.push(newObj);
    }

  }
}

// creates individual grass blocks
function Grass(id, x, y) {
  this.gStatus = true;
  this.image = new Image();
  if (this.gStatus == true) {
    this.image.src = 'Assets/Images/uncutgrass.png';
  } else {
    this.image.src = 'Assets/Images/cutgrass.png';
  }

  this.x = x;
  this.y = y;
  this.id = id;
}

// creates canvas for the lawn
var theLawn = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 1025
    this.canvas.height = 450;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // updates lawn at set interval
    this.interval = setInterval(updateLawn, 20);

    // checks for key presses
    window.addEventListener('keydown', function(event) {
      theLawn.key = event.key;
    })
    window.addEventListener('keyup', function(event) {
      theLawn.key = false;
    })
  },
  clear: function() {

    this.context.clearRect(0, 0, 600, 600);
    // redraws grass
    for (let index = 0; index < grassArray.length; index++) {
      this.context.drawImage(grassArray[index].image, grassArray[index].x, grassArray[index].y, 75, 75);

    }

  }
}

function Lawnmower(colour) {
  // initializes Lawnmower
  this.img = new Image();
  if (colour == "red") {
    this.img.src = 'Assets/Images/red2.png';
  }
  else {
    this.img.src = 'Assets/Images/blue2.png';
  }
  this.speedX = 0;
  this.speedY = 0;
  this.direction = lndir;
  this.x = 0;
  this.y = 0;

  // draws Lawnmower on canvas
  this.update = function() {
    context = theLawn.context;
    context.drawImage(myLawnmower.img, lawnDir[lndir][0], lawnDir[lndir][1], lawnDir[lndir][2], lawnDir[lndir][3], this.x, this.y, lawnDir[lndir][4], lawnDir[lndir][5]);
  }

  // updates Lawnmower position
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// updates Lawn
function updateLawn() {
  theLawn.clear();
  myLawnmower.speedX = 0;
  myLawnmower.speedY = 0;
  numbermowed = 0;

  // checks if Lawnmower is on any grass block
  for (let index = 0; index < grassArray.length; index++) {
    if (!((myLawnmower.x - 5 > grassArray[index].x + 75) ||
      (myLawnmower.x + 5 < grassArray[index].x) ||
      (myLawnmower.y - 5 > grassArray[index].y + 75) ||
      (myLawnmower.y + 5 < grassArray[index].y))) {

      // sets grass to cut grass if on hitbox
      grassArray[index].image = new Image();
      grassArray[index].image.src = "Assets/Images/cutgrass.png"
      grassArray[index].gStatus = false;
      numbermowed += 1
    }

  }
  // moves Lawnmower with arrow keys
  if (theLawn.key != false && theLawn.key == "ArrowLeft" && myLawnmower.x > 0) {
    myLawnmower.speedX = -5;
    lndir = "left";
  } else if (theLawn.key != false && theLawn.key == "ArrowRight" && myLawnmower.x < 967) {
    myLawnmower.speedX = 5;
    lndir = "right";
  } else if (theLawn.key != false && theLawn.key == "ArrowUp" && myLawnmower.y > 0) {
    myLawnmower.speedY = -5;
    lndir = "up";
  } else if (theLawn.key != false && theLawn.key == "ArrowDown" && myLawnmower.y < 380) {
    myLawnmower.speedY = 5;
    lndir = "down";
  }
  // attempt at restarting game after mowing all grass
  if (numbermowed == grassArray.length) {
    startGame()
    mypoints += 1;
  }

  // update Lawnmower position
  myLawnmower.newPos();
  myLawnmower.update();
}
