import Game from "../common_scripts/Game.js";
import FillRect from "../common_scripts/FillRect.js";

const instance = new Game(),
    video = document.getElementById("cam");
    
instance.initialize(document.body);

let data = null,
    ctx = instance.WORLD.ctx,
    canvas = instance.WORLD.node,
    elArray = [];

instance.setDimensions(350, 350);

if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({
            video: { width: 350, height: 350 },
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
                x: row * (canvas.width / 350),
                y: col * (canvas.height / 350),
                w: canvas.width / 350,
                h: canvas.height / 350,
                fill: `rgba(${r}, ${g}, ${b / r}, ${a})`,
            });
            array.push(pixel);
        }
    }
    return array;
}

video.onclick = function () {
    ctx.drawImage(video, 0, 0);
    data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    elArray = drawPixels();
    instance.clear();
    elArray.forEach(_el => _el.draw(ctx));
};
