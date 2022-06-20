import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

c.setSize(true);

c.animate(() => {
    c.ctx.fillRect(0, 0, 100, 100);
});
