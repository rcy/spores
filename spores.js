var width, height, c, ctx;

function rand(val) {
  return Math.floor(Math.random() * val);
}

setupCanvas();

$(window).resize(function() {
  setupCanvas();
})

var delay = 50;
var per = 1;

setInterval(drawStuff, delay);

function setupCanvas() {
  $('body').html('');
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  $('body').html('<canvas id="myCanvas" width="'+width+'" height="'+height+'"></canvas>');
  ctx = $("#myCanvas")[0].getContext("2d");
}

var red = rand(255);
var green = red;
var blue = red;

var paused = false;

$('body').on('click', togglePause);
$('body').on('touchstart', togglePause);

function togglePause(){
  paused = !paused;
  if (paused) {
    document.title = 'spores: paused';
  } else {
    document.title = 'spores';
  }
}

function drawStuff() {
  if (!paused) {
    for (var i = 0; i < per; i++) {
      circle();
      if (rand(0) === 0)
        fadeColors();
    }
  }
}

var x = 100;
var y = 100;
var xdir = Math.random();
var ydir = Math.random();
var factor = 1;

function circle() {
  var max = width+height;
  ctx.beginPath();
  ctx.arc(rand(width), rand(height), rand(max/10) , 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
}

function square() {
  var x = rand(width);
  var y = rand(height);
  var l = rand(80) + 20;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+l, y);
  ctx.lineTo(x+l, y+l);
  ctx.lineTo(x, y+l);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
}

redDir = Math.random();
blueDir = Math.random();
greenDir = Math.random();

function fadeColors() {
  red += redDir;
  if (red > 255) redDir = -Math.random();
  if (red < 0) redDir = +Math.random();

  green += greenDir;
  if (green > 255) greenDir = -Math.random();
  if (green < 0) greenDir = +Math.random();

  blue += blueDir;
  if (blue > 255) blueDir = -Math.random();
  if (blue < 0) blueDir = +Math.random();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba("+Math.floor(red*.9)+","+Math.floor(green*.9)+","+Math.floor(blue*.9)+", .1)";
  ctx.fillStyle="rgba("+Math.floor(red)+","+Math.floor(green)+","+Math.floor(blue)+", .05)";
}
