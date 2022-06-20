export const Controller = {
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
/*
window.addEventListener("keydown", _e => Controller.Keyboard.event(_e));
window.addEventListener("keyup", _e => Controller.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Controller.Mouse.setMobile(_e, canvas));
window.addEventListener("mousedown", _e => Controller.Mouse.setDesktop(_e, canvas));
window.addEventListener("touchend", _e => Controller.Mouse.disable());
window.addEventListener("mouseup", _e => Controller.Mouse.disable());
window.addEventListener("touchmove", _e =>
    Controller.Mouse.setMobileMove(_e, canvas)
);
window.addEventListener("mousemove", _e =>
    Controller.Mouse.setDesktopMove(_e, canvas)
);
*/