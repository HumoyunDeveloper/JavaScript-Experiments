import Game from "../Game/Game.js";
import FillRect from "../Game/FillRect.js";
import FillText from "../Game/FillText.js";
import Arc from "../Game/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

game.WORLD.node.style.backgroundColor = "#efefef";
game.WORLD.node.style.border = "1px solid #677";
game.WORLD.node.style.borderRadius = "8px";

game.setColor("white");

const ctx = game.WORLD.ctx,
    node = game.WORLD.node;

const rect = new FillRect({
        x: node.width / 2 - 25,
        y: node.height / 2 - 25,
        fill: "white",
        w: 50,
        h: 50,
    }),
    text = new FillText({ x: 10, y: 20, fontSize: 17, color: "#fff" });

let inc = 0.025, radius = 100;



animate();
function animate() {
    game.rgbaClear(30, 100, 100, 0.2);
    
    text.draw(ctx);
    rect.draw(ctx);

    text.text = `${inc.toFixed(2)}, sin: ${Math.sin(inc).toFixed(2)}, cos: ${Math.cos(inc).toFixed(2)}`;

    if (Game.Keyboard.arrows.right) {
        inc += 0.025;
        rect.pos.x = Math.cos(inc) * radius + (node.width * 0.5);
    }

    if(Game.Keyboard.arrows.up) {
        inc += 0.025;
        rect.pos.y = Math.sin(inc) * radius + (node.height * 0.5);
    }

    requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
    return `rgb(${_r}, ${_g}, ${_b})`;
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e, node));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e, node));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e, node));
window.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e, node));
window.addEventListener("resize", Game.onResize);
