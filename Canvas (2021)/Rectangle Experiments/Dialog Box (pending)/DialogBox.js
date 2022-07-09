class DialogBox {
    constructor(_el, _ctx) {
        this.node = _el;
        this.ctx = _ctx;
        this.x = 10;
        this.y = 10;
        this.width = 250;
        this.height = 80;
        this.textWidth = this.width;
        this.fill = "#d9d9d9";
        this.text =
            "HI THERE HI THERE HI";
    }

    draw() {
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#144";
        this.ctx.font = "17px normal, monospace";
        this.ctx.textBaseline = "top";
        this.textWidth = ctx.measureText(this.text).width;
        this.ctx.fillText(this.text, this.x + 5, this.y + 5);
    }
}

const canvas = document.getElementById("scene"),
    ctx = canvas.getContext("2d"),
    box = new DialogBox(canvas, ctx);

canvas.width = innerWidth * 0.5;
canvas.height = canvas.width;
canvas.style.border = "1px solid";
box.draw();
