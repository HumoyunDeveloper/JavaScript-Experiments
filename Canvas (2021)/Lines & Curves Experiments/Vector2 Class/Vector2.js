export default class Vector2 {
    static Distance(_v1, _v2) {
        return Math.sqrt((_v1.x - _v2.x) ** 2 + (_v1.y - _v2.y) ** 2);
    }

    constructor(_x = 0, _y = 0) {
        this.x = _x;
        this.y = _y;

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

    __computeMagnitude() {
        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
