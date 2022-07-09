import Game from "./JS/Game.js";
import FillRect from "./JS/FillRect.js";

const instance = new Game(),
    video = document.getElementById("cam"),
    el = document.querySelector("input"),
    val = document.querySelector("#val");

instance.initialize(document.body);

let data = null,
    ctx = instance.WORLD.ctx,
    canvas = instance.WORLD.node,
    elArray = [];

instance.setDimensions(350, 350);

if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({
            video: { width: 100, height: 100 },
            audio: false,
        })
        .then(_object => {
            video.srcObject = _object;
        })
        .catch(_error => alert(_error));
}

function drawPixels() {
    let array = [];
    for (let col = 0; col < data.height; col++) {
        for (let row = 0; row < data.width; row++) {
            let r = data.data[col * 4 * data.width + row * 4],
                g = data.data[col * 4 * data.width + row * 4 + 1],
                b = data.data[col * 4 * data.width + row * 4 + 2],
                a = data.data[col * 4 * data.width + row * 4 + 3];

            const pixel = new FillRect({
                x: row * (canvas.width / 100),
                y: col * (canvas.height / 100),
                w: canvas.width / 100,
                h: canvas.height / 100,
                fill: `rgba(${r}, ${g}, ${b}, ${a})`,
            });
            array.push(pixel);
        }
    }
    return array;
}

window.addEventListener("dblclick", function () {
    ctx.drawImage(video, 0, 0);
    data = ctx.getImageData(0, 0, 100, 100);
    elArray = drawPixels();
    instance.clear();
});

animate();
function animate() {
    instance.clear();
    val.innerText = "Size: " + el.value;
    elArray.forEach((_el, _id) => {
        _el.draw(ctx);
    });
    elArray.forEach((_el, _id) => {
        if (Game.GetDistance(_el, Game.Mouse) < el.value) {
            elArray.splice(_id, 1);
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e, canvas));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e, canvas));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e =>
    Game.Mouse.setMobileMove(_e, canvas)
);
window.addEventListener("mousemove", _e =>
    Game.Mouse.setDesktopMove(_e, canvas)
);
window.addEventListener("resize", Game.onResize);
window.oncontextmenu = _ => _.preventDefault();
