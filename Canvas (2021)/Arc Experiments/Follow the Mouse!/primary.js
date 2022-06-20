import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

c.setSize(true);

function Circle() {
    this.x = 0;
    this.y = 0;
    this.place = function () {
        c.ctx.fillStyle = "#177";
        c.ctx.beginPath();
        c.ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
        c.ctx.closePath();
        c.ctx.fill();
    };
}

function Rect() {
    this.x = 0;
    this.y = 0;
    this.fill = "#155";
    this.vx = Math.random() * -1;
    this.vy = Math.random() * -1;
    this.place = function () {
        c.ctx.fillStyle = this.fill;
        c.ctx.fillRect(this.x, this.y, 5, 5);
    };
    this.collide = function (_) {
        if (
            Math.sqrt(Math.pow(this.x - _.x, 2) + Math.pow(this.y - _.y, 2)) <
            30
        )
            return true;
        return false;
    };
}

const dog = new Circle(),
    colors = ["#144", "#155", "#166", "#177", "#188"];



function lerp(_min, _max, _val) {
    return _val * (_max - _min) + _min;
}

c.animate(() => {
    dog.x = lerp(dog.x, c.Mouse.x, 0.05);
    dog.y = lerp(dog.y, c.Mouse.y, 0.05);
    dog.place();
    
});
