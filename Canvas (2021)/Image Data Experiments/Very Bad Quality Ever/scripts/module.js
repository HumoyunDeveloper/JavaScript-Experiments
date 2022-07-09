import Game from "../JS/Game.js";
import FillRect from "../JS/FillRect.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

const ctx = game.WORLD.ctx,
  node = game.WORLD.node,
  { width, height } = node,
  video = document.getElementById("video");

let data = {},
  pixels = [],
  r = 0,
  g = 0,
  b = 0,
  index = 0;

node.style.backgroundColor = "#efefef";
node.style.border = "3px solid #144";
node.style.borderRadius = "8px";

function accessCamera() {
  if ("mediaDevices" in navigator) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 30,
          height: 30,
        },
      })
      .then(_ => {
        video.srcObject = _;
        init();
      })
      .catch(_ => {
        document.write("<h1>Please, allow me to use your camera!</h1>");
      });
  }
}

function takePhoto() {
  ctx.drawImage(video, 0, 0);
  data = ctx.getImageData(0, 0, 30, 30);
  game.clear();
}

function generate() {
  pixels = [];
  for (let j = 0; j < data.height; j++) {
    for (let i = 0; i < data.width; i++) {
      index = (i + j * data.width) * 4;
      r = data.data[index];
      g = data.data[index + 1];
      b = data.data[index + 2];

      const pixel = new FillRect({
        x: i * 10 + width * 0.5 - (data.width * 10) * 0.5,
        y: j * 10 + height * 0.5 - (data.height * 10) * 0.5,
        w: 10,
        h: 10,
        fill: rgb(r, g, b),
      });

      pixels.push(pixel);
    }
  }
}

accessCamera();

function init() {
  window.onclick = function () {
    takePhoto();
    generate();
    animate();
  };
}

function animate() {
  game.clear();
  pixels.forEach(_pixel => {
    _pixel.draw(ctx);
  });
  requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
  return `rgba(${_r}, ${_g}, ${_b}, 1)`;
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e));
window.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e));
window.addEventListener("resize", Game.onResize);
window.addEventListener("contextmenu", _e => _e.preventDefault());
