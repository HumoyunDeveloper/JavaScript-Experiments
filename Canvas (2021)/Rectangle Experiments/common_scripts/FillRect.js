import Game from "./Game.js";

export default class FillRect {
    constructor(
        _ = {
            x: undefined,
            y: undefined,
            w: 10,
            h: 10,
            fill: "black",
        }
    ) {
        this.groundY = 0;
        this.pos = {
            x: _.x,
            y: _.y,
        };
        this.dim = {
            w: _.w,
            h: _.h,
        };
        this.velocity = {
            x: Game.getRandomInt(1, 3),
            y: Game.getRandomInt(1, 3),
            gravity: Game.getRandom(0.2, 1),
            xfriction: 0.05,
            yfriction: 0.25,
        };
        this.rotation = 0;
        this.fill = _.fill;
    }

    draw(_) {
        _.save();
        _.translate(this.pos.x, this.pos.y);
        _.rotate(this.rotation);
        _.fillStyle = this.fill;
        _.fillRect(0, 0, this.dim.w, this.dim.h);
        _.restore();
    }

    setDim(_w, _h) {
        this.dim.w = _w;
        this.dim.h = _h;
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }

    rotate() {
        this.rotation += 0.1;
    }

    setGround(_obj, _offsetX) {
        this.pos.y = _obj.pos.y - this.dim.h - 150;
        this.pos.x = _offsetX || 20;
        this.groundY = _obj.pos.y - this.dim.h;
    }

    collideGround() {
        return this.pos.y + this.dim.h >= this.groundY;
    }

    onGround() {
        return this.pos.y == this.groundY;
    }

    isStill() {
        return this.velocity.x + this.velocity.y == 0;
    }

    getCenter() {
        return this.pos.x + this.dim.w * 0.5;
    }

    isStillX() {
        return this.velocity.x == 0;
    }
}
