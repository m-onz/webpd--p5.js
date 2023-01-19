
var t = 0;

var img;

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function setup () {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index','-1');
  fill('black');
  noStroke();
  button = createButton('play sound');
  button.position(0, 0);
  button.mousePressed(handler);
  img = loadImage('./asset/myPatch.svg');
}

var prevMouseX = 0;
var prevMouseY = 0;
var lastCycle = 0;

function draw () {
  background(100, 10);
  for (var x = 0; x <= width; x = x + 30) {
    for (var y = 0; y <= height; y = y + 30) {
      var xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      var yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      var angle = xAngle * (x / width) + yAngle * (y / height);
      var myX = x + 20 * cos(2 * PI * t + angle);
      var myY = y + 20 * sin(2 * PI * t + angle);
      ellipse(myX, myY, 10);
      lastCycle = myX + myY
    }
  }
  t = t + 0.01;
  if (prevMouseX !== mouseX) Pd.send('mouseX', [ mouseX  ])
  if (prevMouseY !== mouseY) Pd.send('mouseY', [ mouseY  ])
  Pd.send('cycle', [ lastCycle * 11 ])
  prevMouseX = mouseX
  prevMouseY = mouseY
  image(img, 0, 0)
}

function handler () {
  Pd.start()
  userStartAudio();
}
