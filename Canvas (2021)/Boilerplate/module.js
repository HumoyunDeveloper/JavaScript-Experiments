import Game from "./JS/Game.js";
import FillRect from "./JS/FillRect.js";
import FillText from "./JS/FillText.js";
import Arc from "./JS/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(350, 300);

game.WORLD.node.style.backgroundColor = "#efefef";
game.WORLD.node.style.border = "1px solid #677";
game.WORLD.node.style.borderRadius = "8px";

game.setColor("white");

const ctx = game.WORLD.ctx,
    node = game.WORLD.node,
    { width, height } = node;

//   animate();

function animate() {
    game.clear();
    requestAnimationFrame(animate);
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
