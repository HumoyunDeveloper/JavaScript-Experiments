const Controller = {
    Mouse: {
        x: undefined,
        y: undefined,
        active: false,

        /* for ontouchstart event */
        setMobile(_, _p) {
            this.active = true;
            this.x = _.touches[0].clientX - _p.getBoundingClientRect().left;
            this.y = _.touches[0].clientY - _p.getBoundingClientRect().top;
        },

        /* for onmousedown event */
        setDesktop(_, _p) {
            this.active = true;
            this.x = _.clientX - _p.getBoundingClientRect().left;
            this.y = _.clientY - _p.getBoundingClientRect().top;
        },

        setMobileMove(_, _p) {
            this.x = _.touches[0].clientX - _p.getBoundingClientRect().left;
            this.y = _.touches[0].clientY - _p.getBoundingClientRect().top;
        },

        /* for onmousedown event */
        setDesktopMove(_, _p) {
            this.x = _.clientX - _p.getBoundingClientRect().left;
            this.y = _.clientY - _p.getBoundingClientRect().top;
        },

        disable() {
            this.active = false;
        },
        setButtons(_eq) {
            _eq.map(_ => {
                if (
                    !(
                        this.x <= _.sx ||
                        this.x >= _.sx + _.w ||
                        this.y <= _.sy ||
                        this.y >= _.sy + _.h
                    )
                ) {
                    return (_.active = true && _);
                }
                return (_.active = false && _);
            });
        },
    },

    Keyboard: {
        active: false,
        shift: false,
        space: false,
        key: "",
        arrows: {
            left: false,
            right: false,
            up: false,
            down: false,
        },

        /* onkeydown event */
        event(_) {
            if (_.key == "ArrowLeft") this.arrows.left = true;
            if (_.key == "ArrowRight") this.arrows.right = true;
            if (_.key == "ArrowDown") this.arrows.down = true;
            if (_.key == "ArrowUp") this.arrows.up = true;
            if (_.key == "Shift") this.shift = true;
            if (_.keyCode == 32) this.space = true;

            this.active = true;
            this.arrows.key = _.key;
        },

        keyUpEvent(_) {
            if (_.key == "ArrowLeft") this.arrows.left = false;
            if (_.key == "ArrowRight") this.arrows.right = false;
            if (_.key == "ArrowDown") this.arrows.down = false;
            if (_.key == "ArrowUp") this.arrows.up = false;
            if (_.key == "Shift") this.shift = false;
            if (_.keyCode == 32) this.space = false;

            this.active = false;
        },

        reset() {
            this.arrows.left = false;
            this.arrows.right = false;
            this.arrows.down = false;
            this.arrows.up = false;
        },
    },
};

const Line = function (_ = []) {
    this.vertices = _;
    this.startX = 0;
    this.startY = 0;

    this.settings = {
        fillStyle: undefined,
        strokeStyle: "black",
        lineJoin: "round",
        lineCap: "round",
    };

    this.place = function (_ctx) {
        _ctx.fillStyle = this.settings.fillStyle;
        _ctx.strokeStyle = this.settings.strokeStyle;
        _ctx.beginPath();
        _ctx.moveTo(this.startX, this.startY);
        for (let i = 0; i < this.vertices.length; i += 2) {
            _ctx.lineTo(this.vertices[i], this.vertices[i + 1]);
        }
        _ctx.closePath();
        _ctx.stroke();
        if (this.settings.fillStyle) _ctx.fill();
    };

    this.init = function () {
        this.startX = this.vertices[0];
        this.startY = this.vertices[1];

        this.vertices.shift();
        this.vertices.shift();
    };
};

const Circle = function (_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.fillStyle = "black";
    this.place = function (_ctx) {
        _ctx.fillStyle = this.fillStyle;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _ctx.closePath();
        _ctx.fill();
    };
};

const Triangle = function (_x, _y, _sideLength) {
    this.x = _x;
    this.y = _y;
    this.sideLength = _sideLength;
    this.a = (Math.PI * 2) / 3;
    this.centerPoint = false;
    this.line = new Line();
    this.point = new Circle(this.x, this.y, 2);
    this.point.fillStyle = "white";
    this.init = function () {
        this.line.vertices = [];
        for (let i = 0; i < Math.PI * 2; i += this.a) {
            this.line.vertices.push(this.x + this.sideLength * Math.cos(i));
            this.line.vertices.push(this.y + this.sideLength * Math.sin(i));
        }
        this.line.init();
    };

    this.init();

    this.place = function (_ctx) {
        if (this.centerPoint) this.point.place(_ctx);
        this.line.place(_ctx);
    };
};

const FillText = function (_text, _x, _y) {
    this.x = _x;
    this.y = _y;
    this.rotation = 0;
    this.text = _text;
    this.fontSize = 16;
    this.fontFamily = "monospace";
    this.fillStyle = "white";

    this.place = function (_ctx) {
        _ctx.save();
        _ctx.translate(this.x, this.y);
        _ctx.rotate(this.rotation);
        _ctx.font = this.fontSize + "px normal " + this.fontFamily;
        _ctx.fillStyle = this.fillStyle;
        _ctx.fillText(this.text, 0, 0);
        _ctx.restore();
    };

    this.convertToRadians = function (_degree) {
        return ((Math.PI * 2) / 360) * _degree;
    };

    this.setRotation = function (_degree) {
        this.rotation = this.convertToRadians(_degree);
    };
};

const canvas = document.getElementById("scene");

let width = (canvas.width = 350),
    height = (canvas.height = 350),
    ctx = canvas.getContext("2d");

const triangle = new Triangle(width * 0.5, height * 0.5, 100);
triangle.line.settings.strokeStyle = "white";
triangle.centerPoint = true;

const text = new FillText(
    triangle.x + ", " + triangle.y,
    triangle.x,
    triangle.y - 10
);

const text2 = new FillText(
    triangle.sideLength,
    triangle.x - triangle.sideLength * 0.5 - 5,
    triangle.y + 15
);
text2.setRotation(-90);

const text3 = new FillText(
    triangle.sideLength,
    triangle.x + 20,
    triangle.y + triangle.sideLength * 0.5 + 5
);
text3.setRotation(150);

const text4 = new FillText(
    triangle.sideLength,
    triangle.x + 20,
    triangle.y - triangle.sideLength * 0.5 - 5
);
text4.setRotation(30);

triangle.line.settings.fillStyle = "#155";

animate();
function animate() {
    ctx.clearRect(0, 0, width, height);

    triangle.place(ctx);

    text2.text = triangle.sideLength.toFixed(2);
    text3.text = triangle.sideLength.toFixed(2);
    text4.text = triangle.sideLength.toFixed(2);

    text.place(ctx);
    text.x = triangle.x;
    text.y = triangle.y - 10;

    text2.place(ctx);
    text2.x = triangle.x - triangle.sideLength * 0.5 - 5;
    text2.y = triangle.y + 15;

    text3.place(ctx);
    text3.x = triangle.x + 20;
    text3.y = triangle.y + triangle.sideLength * 0.5 + 5;

    text4.place(ctx);
    text4.x = triangle.x + 20;
    text4.y = triangle.y - triangle.sideLength * 0.5 - 5;

    if (Controller.Mouse.active) {
        
        ctx.beginPath();
        ctx.moveTo(triangle.x, triangle.y);
        ctx.lineTo(Controller.Mouse.x, Controller.Mouse.y);
        ctx.closePath();
        ctx.stroke();

        triangle.sideLength = Math.sqrt(
            Math.pow(triangle.x - Controller.Mouse.x, 2) +
                Math.pow(triangle.y - Controller.Mouse.y, 2)
        );
        triangle.init();
    }
    setTimeout(animate, 1000 / 30); // 30fps
}

window.addEventListener("keydown", _e => Controller.Keyboard.event(_e));
window.addEventListener("keyup", _e => Controller.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e =>
    Controller.Mouse.setMobile(_e, canvas)
);
window.addEventListener("mousedown", _e =>
    Controller.Mouse.setDesktop(_e, canvas)
);
window.addEventListener("touchend", _e => Controller.Mouse.disable());
window.addEventListener("mouseup", _e => Controller.Mouse.disable());
window.addEventListener("touchmove", _e =>
    Controller.Mouse.setMobileMove(_e, canvas)
);
window.addEventListener("mousemove", _e =>
    Controller.Mouse.setDesktopMove(_e, canvas)
);
