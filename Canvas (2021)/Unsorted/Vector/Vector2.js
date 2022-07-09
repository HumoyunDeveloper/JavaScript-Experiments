export default class Vector2 {
    static Distance(_v1, _v2) {
        return Math.sqrt((_v1.x - _v2.x) ** 2 + (_v1.y - _v2.y) ** 2);
    }

    constructor(_x = 0, _y = 0, _pos = { x: 0, y: 0 }) {
        this.x = _x;
        this.y = _y;
        this.pos = _pos;
        this.__computeMagnitude();
    }

    setPos(_x = 0, _y = 0) {
        this.x = _x;
        this.y = _y;

        this.__computeMagnitude();
    }

    normalize() {
        this.x /= this.magnitude;
        this.y /= this.magnitude;

        this.__computeMagnitude();
    }

    normalizeDC() {
        let dist = Math.sqrt(this.x * this.x + this.y * this.y);
        return { x: this.x / dist, y: this.y / dist };
    }

    scale(_scalar) {
        this.x *= _scalar;
        this.y *= _scalar;
    }

    subtract(_val) {
        this.x -= _val;
        this.y -= _val;
    }

    add(_val) {
        this.x += _val;
        this.y += _val;
    }

    show(_ctx) {
        _ctx.save();
        _ctx.translate(this.pos.x, this.pos.y);
        _ctx.strokeStyle = "white";
        _ctx.lineWidth = 2;
        _ctx.beginPath();
        _ctx.moveTo(0, 0);
        _ctx.lineTo(this.x, this.y);
        _ctx.closePath();
        _ctx.stroke();
        _ctx.restore();
    }

    __computeMagnitude() {
        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
