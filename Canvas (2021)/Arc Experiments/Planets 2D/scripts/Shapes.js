class Shape {
    constructor({
        x = 0,
        y = 0,
        radius = 100,
        width = 100,
        height = 100,
        _rotation = 0,
        fillColor = "black",
        stroke = false,
        distance = 0
    }) {
        this.rotation = _rotation;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.height = height;
        this.frictionY = 0.2;
        this.speed = Math.random() * (0.001 - 0.00005) + 0.00005;
        this.distance = distance;
        this.vy = 3;
        this.vx = 2;
        this.stroke = stroke;
        this.fillColor = fillColor;
    }

    getRight() {
        return this.x + this.width;
    }

    getBottom() {
        return this.y + this.height;
    }

    getCentreX() {
        return this.x + this.width * 0.5;
    }

    getCentreY() {
        return this.y + this.height * 0.5;
    }
}

export default class Circle extends Shape {
    constructor(_) {
        super(_);
    }

    draw(_ctx) {
        _ctx.fillStyle = this.fillColor;
        _ctx.strokeStyle = this.fillColor;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        _ctx.closePath();
        this.stroke ? _ctx.stroke() : _ctx.fill();
    }

    circumference() {
        return Math.PI * 2 * this.radius;
    }
}
