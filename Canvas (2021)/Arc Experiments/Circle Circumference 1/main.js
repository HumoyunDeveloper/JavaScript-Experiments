import { Circle, Line } from "./Circle.js";

const canvas = document.querySelector("canvas"),
    { width, height } = canvas,
    ctx = canvas.getContext("2d"),
    points = [];

function randomize() {
    const circle = new Circle({
        x: width / 2,
        y: height / 2,
        radius: Math.floor(Math.random() * 35 + 10),
        fillColor: "white",
    });

    //   const line = new Line([
    //     {
    //       x: canvas.width / 2 - circle.circumference() / 2,
    //       y: canvas.height / 4,
    //     },
    //     {
    //       x: canvas.width / 2 - circle.circumference() / 2 + circle.circumference(),
    //       y: canvas.height / 4,
    //     },
    //   ]);

    //   circle.draw(ctx);

    for (let i = 0; i < Math.PI * 2 + 0.2; i += 0.1) {
        points.push({
            radius: circle.radius,
            diamter: circle.radius * 2,
            sin: Math.sin(i),
            cos: Math.cos(i),
            x: width / 2,
            y: height / 2,
        });
    }
    update();
}

function r() {
    return Math.floor(Math.random() * 255);
}

function update() {
    //   ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#1aa";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    let i = 0;

    const interval = setInterval(() => {
        i++;
        if (i > points.length - 2) {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = `rgb(${r()}, ${r()}, ${r()})`;
            points.forEach(_ => {
                ctx.lineTo(
                    points[i].x + points[i].radius * points[i].cos,
                    points[i].y + points[i].radius * points[i].sin
                );

                ctx.stroke();
            });
            clearInterval(interval);
        }
        ctx.lineTo(
            points[i].x + points[i].radius * points[i].cos,
            points[i].y + points[i].radius * points[i].sin
        );
        ctx.stroke();
    }, 1000 / 60);

    //   ctx.closePath();

    //   requestAnimationFrame(update);
}

randomize();

document.querySelector("button").onclick = () => document.location.reload();
