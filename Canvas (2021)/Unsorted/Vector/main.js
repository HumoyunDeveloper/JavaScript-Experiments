import Canvas2D from "./Canvas2D.js";
import Vector2 from "./Vector2.js";

const stage = new Canvas2D({ clearCanvas: true });

const vector = new Vector2(stage.Mouse.x, stage.Mouse.y, {
    x: stage.centerX,
    y: stage.centerY,
});

let angle = 0;

stage.animate(() => {
    vector.show(stage.ctx);

    vector.x = stage.Mouse.x - vector.pos.x;
    vector.y = stage.Mouse.y - vector.pos.y;

    angle = -((Math.atan2(vector.y, vector.x)) * 180 / Math.PI).toFixed(2);


    if(angle < 0) angle = (angle + 360).toFixed(2);

    vector.__computeMagnitude();
    vector.normalize();

    vector.scale(90);

    stage.ctx.textAlign = "center";
    stage.ctx.textBaseline = "center";
    stage.ctx.font = "18px normal, monospace";
    stage.ctx.fillStyle = "white";

    stage.ctx.fillText("Angle: " + angle, stage.centerX, stage.centerY - 110);

    stage.ctx.strokeStyle = "#1aa";
    stage.ctx.beginPath();
    stage.ctx.arc(stage.centerX, stage.centerY, 90, 0, Math.PI * 2, false);
    stage.ctx.closePath();
    stage.ctx.stroke();
});
