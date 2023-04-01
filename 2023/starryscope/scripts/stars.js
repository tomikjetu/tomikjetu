const skyBackground = document.querySelector(".star-container");
var skyContext = skyBackground.getContext('2d');

var stars = [];
var STARSAMOUNT;
function UpdateScreen() {
  skyBackground.width = window.innerWidth;
  skyBackground.height = window.innerHeight;
  STARSAMOUNT = window.innerWidth * 1.2;
  CreateStars();
}
UpdateScreen();
addEventListener("resize", (event) => {
  if (window.innerWidth != skyBackground.width) UpdateScreen()
});

function CreateStars() {
  stars = [];
  for (var i = 0; i < STARSAMOUNT; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2,
      opacitySeed: Math.random(),
      speed: Math.random() * 10 + 10
    })
  }
}

var t = 0;
function Draw() {
  t++;
  skyContext.clearRect(0, 0, skyBackground.width, skyBackground.height);

  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];

    var alpha = Math.sin((t + star.opacitySeed) / star.speed) / 3 + 0.5;

    if (star.radius < 0.7) {
      star.x -= Math.random() * 0.5;
      star.y -= Math.random() * 0.5;
    }
    if (star.radius < 1.2) {
      star.x -= Math.random() * 0.1;
      star.y -= Math.random() * 0.1;;
    }
    if (star.radius < 1.6) {
      star.x -= Math.random() * 0.05;
      star.y -= Math.random() * 0.05;
    }
    if (star.radius < 2) {
      star.x -= Math.random() * 0.01;
      star.y -= Math.random() * 0.01;
    }
    if (star.x < 0 || star.y < 0) {
      star.x = Math.random() * window.innerWidth;
      star.y = Math.random() * window.innerHeight;
    }


    skyContext.fillStyle = `rgb(255, 255, 255, ${alpha})`;
    skyContext.beginPath();
    skyContext.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    skyContext.stroke();
    skyContext.fill();
  }
  window.requestAnimationFrame(Draw);
}
Draw();