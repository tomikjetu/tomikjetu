var canvas;
var ctx;
window.addEventListener('load', setup);
window.addEventListener('resize', resize);

function setup() {
  canvas = document.getElementById("background");
  ctx = canvas.getContext("2d");
  resize();
  initParticles();
  draw();
}


function resize() {
  const { innerWidth, innerHeight } = window;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawParticles();

  window.requestAnimationFrame(draw);
}


const ParticlesCount = 80;
const ParticlesPropCount = 9; //how many properties the particle has
const ParticlesPropLength = ParticlesCount * ParticlesPropCount;
const particles = new Int32Array(ParticlesPropLength);

const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 5;
const rangeSpeed = 5;
const baseRadius = 80;
const rangeRadius = 1;

const backgroundColor = "hsla(20, 40%, 50%, 1)";
const baseHue = 20;
const rangeHue = 50;

var simplex = new SimplexNoise();
var tick = 0;
const noiseSteps = 1;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const TAU = 2 * Math.PI;

function initParticles() {
  for (var i = 0; i < ParticlesPropLength; i += ParticlesPropCount) {
    initParticle(i);
  }
}

function initParticle(i) {
  var x, y, vx, vy, life, ttl, speed, radius, hue;

  x = rand(canvas.width);
  y = rand(canvas.height);
  vx = 0;
  vy = 0;
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  radius = baseRadius + rand(rangeRadius);
  hue = baseHue + rand(rangeHue);

  particles.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function checkBounds(x, y) {
  return (
    x > canvas.width || x < 0 ||
    y > canvas.height || y < 0
  );
}

function drawParticles() {
  tick++
  for (var i = 0; i < ParticlesPropLength; i += ParticlesPropCount) {
    updateParticle(i);
  }
}

function updateParticle(i) {
  let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
  let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;
  x = particles[i];
  y = particles[i2];
  n = simplex.noise3D(x * xOff, y * yOff, tick * zOff)//* noiseSteps * 2 * TAU;
  // n = simplex.noise2D(x * xOff, y * yOff)//* noiseSteps * 2 * TAU;
  vx = lerp(particles[i3], Math.cos(n), 0.5);
  vy = lerp(particles[i4], Math.sin(n), 0.5);
  life = particles[i5];
  ttl = particles[i6];
  speed = particles[i7];
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  radius = particles[i8];
  hue = particles[i9];

  drawParticle(x, y, x2, y2, life, ttl, radius, hue);

  life++;

  particles[i] = x2;
  particles[i2] = y2;
  particles[i3] = vx;
  particles[i4] = vy;
  particles[i5] = life;
  (checkBounds(x, y) || life > ttl) && initParticle(i);
}

function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineWidth = radius;
  ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke()
  ctx.closePath();
  ctx.restore();
}