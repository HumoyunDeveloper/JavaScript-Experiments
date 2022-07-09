import Game from "../JS/Game.js";
import FillRect from "../JS/FillRect.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(innerWidth, innerHeight);

const ctx = game.WORLD.ctx,
    node = game.WORLD.node,
    { width, height } = node,
    image = new Image();

image.src = "./image.png";

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Nath.random() * 0.5 
        this.velocity = Nath.random() * 1.5, 1 
      }

      update() {
        this.y += this.velocity;
        this.x = Math.random() * 0.5;
      }

      draw() {
        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.arc(this.x, this.y, )
      }
}

animate();
function animate() {
    game.clear();
    ctx.drawImage(image, 0, 0);
    requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
    return `rgba(${_r}, ${_g}, ${_b}, 1)`;
}

window.addEventListener("resize", Game.onResize);
window.addEventListener("contextmenu", _e => _e.preventDefault());
