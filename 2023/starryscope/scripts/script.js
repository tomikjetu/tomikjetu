/*
        ░█████╗░██████╗░██╗
        ██╔══██╗██╔══██╗██║
        ███████║██████╔╝██║
        ██╔══██║██╔═══╝░██║
        ██║░░██║██║░░░░░██║
        ╚═╝░░╚═╝╚═╝░░░░░╚═╝
*/


function callApi(endpoint) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send();
  });
}

/*
      ░█████╗░██╗██████╗░░█████╗░██╗░░░░░███████╗
      ██╔══██╗██║██╔══██╗██╔══██╗██║░░░░░██╔════╝
      ██║░░╚═╝██║██████╔╝██║░░╚═╝██║░░░░░█████╗░░
      ██║░░██╗██║██╔══██╗██║░░██╗██║░░░░░██╔══╝░░
      ╚█████╔╝██║██║░░██║╚█████╔╝███████╗███████╗
      ░╚════╝░╚═╝╚═╝░░╚═╝░╚════╝░╚══════╝╚══════╝ 
*/

const zodiac = document.getElementById("zodiac");
const zodiacCenter = zodiac.querySelector(".center");

function UpdateCircleGraphs() {
  document.querySelectorAll('.ciclegraph').forEach((circlegraph) => {
    let signs = circlegraph.querySelectorAll('.sign');
    let angle = 360 - 120, dangle = 360 / signs.length;
    for (let i = 0; i < signs.length; ++i) {
      let sign = signs[i];
      angle += dangle;
      sign.style.transform = `rotate(${angle}deg) translate(${circlegraph.clientWidth / 2}px, ${angle / 100}px) rotate(-${angle}deg)`;
      sign.addEventListener("mouseover", () => { display(sign); });
      sign.addEventListener("mouseenter", () => { zodiacCenter.classList.remove("hide"); });
      sign.addEventListener("mouseleave", () => { zodiacCenter.classList.add("hide") });
    }
  });
}

window.addEventListener("resize", UpdateCircleGraphs);

/*
        ██████╗░░█████╗░████████╗███████╗
        ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
        ██║░░██║███████║░░░██║░░░█████╗░░
        ██║░░██║██╔══██║░░░██║░░░██╔══╝░░
        ██████╔╝██║░░██║░░░██║░░░███████╗
        ╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝
        */
       
function UpdateToday() {
  var now = new Date();
  date = new Date();
  document.getElementById("date").innerText = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
}

/*
      █▀▄ █ █▀ █▀█ █░░ ▄▀█ █▄█
      █▄▀ █ ▄█ █▀▀ █▄▄ █▀█ ░█░
*/

function display(sign) {
  const name = sign.getAttribute("name");
  apiName = sign.getAttribute("api-name");
  document.getElementById("signName").innerText = name;
}


/*
        ██╗░░░░░░█████╗░░██████╗░██╗░█████╗░
        ██║░░░░░██╔══██╗██╔════╝░██║██╔══██╗
        ██║░░░░░██║░░██║██║░░██╗░██║██║░░╚═╝
        ██║░░░░░██║░░██║██║░░╚██╗██║██║░░██╗
        ███████╗╚█████╔╝╚██████╔╝██║╚█████╔╝
        ╚══════╝░╚════╝░░╚═════╝░╚═╝░╚════╝░
*/

UpdateCircleGraphs();
UpdateToday();