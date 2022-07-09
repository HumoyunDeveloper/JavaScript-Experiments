var canvas = document.querySelector("#game-scene");
var ctx = canvas.getContext("2d");
var WIDTH = 80;
var HEIGHT = 80;
var MAXW = 400;
var MAXH = 400;
var COL = 5;
var ROW = 5;
var OBJECTS = [];
var TCT = [];
var image = new Image();
var SELECTED_OBJ = null;
image.src = "./25.jpg";
canvas.width = canvas.height = MAXH * 1.5;
const mouse = {
    x: 0,
    w: 10,
    h: 10,
    y: 0,
    active: false,
    collide: function (obj) {
        if (
            this.x <= obj.opt.x + obj.opt.w &&
            this.x + this.w >= obj.opt.x &&
            this.y <= obj.opt.y + obj.opt.h &&
            this.y + this.h >= obj.opt.y
        ) {
            return true;
        }
        return false;
    },
};

class Rect {
    constructor(opt, type) {
        this.opt = opt;
        this.type = type;
        this.obj = { ...this.opt };
    }
    draw() {
        if (this.type) {
            ctx.strokeWidth = 0.5;
        }
        ctx.strokeWidth = 1;
        ctx.strokeStyle = "#444";
        ctx.beginPath();
        ctx.rect(
            this.opt.x - 1,
            this.opt.y - 1,
            this.opt.w + 2,
            this.opt.h + 2
        );
        ctx.closePath();
        ctx.stroke();
        if (this.type) {
            ctx.drawImage(
                image,
                this.opt.sx,
                this.opt.sy,
                this.opt.sw,
                this.opt.sh,
                this.opt.x,
                this.opt.y,
                this.opt.w,
                this.opt.h
            );
        }
    }

    update() {
        this.draw();
    }

    collide(obj) {
        if (
            this.opt.x <= obj.x + obj.w &&
            this.opt.x + this.opt.w >= obj.x &&
            this.opt.y <= obj.y + obj.h &&
            this.opt.y + this.opt.h >= obj.y
        ) {
            return true;
        }
        return false;
    }

    dist(obj) {
        var dx = this.opt.x - obj.x,
            dy = this.opt.y - obj.y,
            c = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return c;
    }

    close() {
        if (this.dist(this.obj) <= 30) {
            return true;
        }
        return false;
    }

    sup() {
        this.opt.x = this.obj.x;
        this.opt.y = this.obj.y;
    }
}

image.onload = function () {
    init();
};

function init() {
    OBJECTS = [];
    for (var y = 0; y < COL; y++) {
        for (var x = 0; x < ROW; x++) {
            var opts = {
                y: y * HEIGHT + MAXW / 2 / 2,
                x: x * WIDTH + MAXH / 2 / 2,
                w: WIDTH,
                h: HEIGHT,
                sx: x * WIDTH,
                sy: y * WIDTH,
                sw: WIDTH,
                sh: HEIGHT,
            };
            var obj = new Rect(opts, true);
            var opts2 = {
                y: y * HEIGHT + MAXW / 2 / 2,
                x: x * WIDTH + MAXH / 2 / 2,
                w: WIDTH,
                h: HEIGHT,
                sx: x * WIDTH,
                sy: y * WIDTH,
                sw: WIDTH,
                sh: HEIGHT,
            };
            var obj2 = new Rect(opts2, false);
            TCT.push(obj2);
            OBJECTS.push(obj);
        }
    }
}

draw();
function draw() {
    ctx.clearRect(0, 0, MAXW * 1.5, MAXH * 1.5);
    TCT.forEach(ob => ob.draw());
    for (var d = OBJECTS.length - 1; d >= 0; d--) {
        OBJECTS[d].update();
    }

    if (SELECTED_OBJ) {
        SELECTED_OBJ.opt.x = mouse.x - mouse.offsetX;
        SELECTED_OBJ.opt.y = mouse.y - mouse.offsetY;
    }
    requestAnimationFrame(draw);
}

function mouseDown(ev) {
    mouse.active = true;
    var x = ev.clientX - canvas.getBoundingClientRect().left,
        y = ev.clientY - canvas.getBoundingClientRect().top;
    mouse.x = x;
    mouse.y = y;
    mouse.offsetX = 0;
    mouse.offsetY = 0;

    var index = OBJECTS.findIndex(obj => mouse.collide(obj) == true);

    if (index != -1) {
        SELECTED_OBJ = OBJECTS[index];
        mouse.offsetX = mouse.x - SELECTED_OBJ.opt.x;
        mouse.offsetY = mouse.y - SELECTED_OBJ.opt.y;
        OBJECTS.splice(index, 1);
        OBJECTS.unshift(SELECTED_OBJ);
    }
}

function mouseUp() {
    mouse.active = false;
    if (SELECTED_OBJ) {
        if (SELECTED_OBJ.close()) {
            SELECTED_OBJ.sup();
        }
    }
    SELECTED_OBJ = null;
}

function mouseMove(ev) {
    var x = ev.clientX - canvas.getBoundingClientRect().left;
    var y = ev.clientY - canvas.getBoundingClientRect().top;
    mouse.x = x;
    mouse.y = y;
}

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;
