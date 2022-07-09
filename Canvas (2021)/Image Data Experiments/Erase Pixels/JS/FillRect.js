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
        this.x = _.x;
        this.y = _.y;

        this.width = _.w;
        this.height = _.h;

        this.velocity = {
            x: 1,
            y: 2,
            gravity: 0.2,
            xfriction: 0.001,
            yfriction: 0.1,
        };

        this.transform = { x: this.x, y: this.y };
        // rotation
        this.rotation = 0;
        this.speed = 0;
        this.fill = _.fill;
    }

    draw(_) {
        if (this.rotation > Math.PI * 2 || this.rotation < -(Math.PI * 2))
            this.rotation = 0;
        _.fillStyle = this.fill;
        _.save();
        _.translate(this.x, this.y);
        _.rotate(this.rotation);
        _.fillRect(0, 0, this.width, this.height);
        _.restore();
    }

    setDim(_w, _h) {
        this.width = _w;
        this.height = _h;
    }

    setPos(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    rotateRight() {
        this.rotation += 0.1;
    }
}
