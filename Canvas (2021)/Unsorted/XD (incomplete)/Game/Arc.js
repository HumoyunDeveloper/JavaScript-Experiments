export default class Arc {
    constructor(
        _ = {
            x: undefined,
            y: undefined,
            r: 10,
            fill: "black",
        }
    ) {
        this.pos = {
            x: _.x,
            y: _.y,
        };
        this.r = _.r;
        this.rotation = 0;
        this.fill = _.fill;
        this.velocity = {
            x: 1.2,
            y: 1.2,
            gravity: 0.2,
            friction: 0.8,
        };

        this.space = 10;
        this.isAI = false;
        this.ai = {
            dir: {
                left: false,
                right: false,
                up: false,
                down: false,
                reset() {
                    this.down = false;
                    this.right = false;
                    this.left = false;
                    this.up = false;
                },
            },
            datas: {
                dirs: [],
                dirs2: []
                /* Data learned */
            },
        };
        this.keyControl = false;
    }

    draw(_) {
        _.fillStyle = this.fill;
        _.beginPath();
        _.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
        _.closePath();
        _.fill();
    }

    update(_) {
        this.draw(_);
        if (this.ai.dir.down) {
            this.pos.y += this.velocity.y;
        }

        if (this.ai.dir.left) {
            this.pos.x -= this.velocity.x;
        }

        if (this.ai.dir.right) {
            this.pos.x += this.velocity.x;
        }

        if (this.ai.dir.up) {
            this.pos.y -= this.velocity.y;
        }
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }
}
