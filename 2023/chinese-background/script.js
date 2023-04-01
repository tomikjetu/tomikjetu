const backgroundCanvas = document.getElementById("background");
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;
const backgroundContext = backgroundCanvas.getContext("2d");

var Texts = [
  {
    content: "听不懂",
    size: 29,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    content: "你好",
    size: 26,
    x: Math.random() * window.innerWidth - 30,
    y: window.innerHeight - Math.random() * 500
  },
  {
    content: "早上好",
    size: 23,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    content: "出租车",
    size: 23,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    content: "晚安",
    size: 20,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    content: "谢谢",
    size: 17,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
]

var lanterns = [
  {
    src: "lantern.png",
    size: 100,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    src: "lantern.png",
    size: 50,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    src: "lantern.png",
    size: 80,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  },
  {
    src: "lantern.png",
    size: 70,
    x: Math.random() * window.innerWidth - 25,
    y: window.innerHeight - Math.random() * 500
  }
]

lanterns.forEach(lantern => {
  lantern.image = new Image();
  lantern.image.src = lantern.src;
})


setInterval(function () {

  //background

  var grd = backgroundContext.createLinearGradient(0, 800, window.innerWidth, 0);
  grd.addColorStop(0, "#FB8B24");
  grd.addColorStop(0.5, "#9A031E");
  grd.addColorStop(1, "#5F0F40");

  // Fill with gradient
  backgroundContext.fillStyle = grd;
  backgroundContext.fillRect(0, 0, window.innerWidth, window.innerHeight);


  Texts.forEach(text => {
    //texts
    backgroundContext.fillStyle = "white";
    backgroundContext.font = text.size + "px Arial";
    backgroundContext.filter = "blur(1px)"
    backgroundContext.fillText(text.content, text.x, text.y);
    text.y -= 0.5;
    if (text.y < 0) { text.y = window.innerHeight };
  });
  backgroundContext.filter = ""

  lanterns.forEach(lantern => {
    backgroundContext.drawImage(lantern.image, lantern.x, lantern.y, lantern.size, lantern.size);
    lantern.y -= 0.5;
    if (lantern.y < 0) { lantern.y = window.innerHeight };
  })

}, 20);