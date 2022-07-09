import Game from "../JS/Game.js";
import FillRect from "../JS/FillRect.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

const ctx = game.WORLD.ctx,
    node = game.WORLD.node,
    { width, height } = node;

node.style.backgroundColor = "#122";
node.style.border = "3px solid #144";
node.style.borderRadius = "8px";

ctx.fillStyle = "yellow";
ctx.font = "27px normal, monospace";
ctx.fillText("Hello, World!", 10, 30);
const data = ctx.getImageData(0, 0, 200, 55);

let index = 0,
    obj = [],
    rect = {};

for (let i = 0; i < data.height; i++) {
    for (let j = 0; j < data.width; j++) {
        index = (i * data.width + j) * 4;
        if (data.data[index + 3]) {
            rect = new FillRect({
                x: game.WORLD.dimensions.w * 0.5 - data.width * 0.5 + j,
                y: game.WORLD.dimensions.h * 0.5 - data.height * 0.5 + i,
                w: 1,
                h: 1,
                fill: "white",
            });
            rect.savedX = rect.pos.x;
            rect.savedY = rect.pos.y;
            obj.push(rect);
        }
    }
}

animate();
function animate() {
    game.clear();
    Game.Mouse.y = game.WORLD.dimensions.h * 0.5 - 5;
    Game.Mouse.x += 1.5;
    if (Game.Mouse.x > node.width) Game.Mouse.x = 0;
    obj.forEach(_ => _.update(ctx));
    requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
    return `rgba(${_r}, ${_g}, ${_b}, 1)`;
}
window.addEventListener("resize", Game.onResize);
window.addEventListener("contextmenu", _e => _e.preventDefault());
