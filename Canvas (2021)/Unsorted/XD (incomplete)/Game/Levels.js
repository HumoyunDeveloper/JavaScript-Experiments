import Arc from "./Arc.js";

function generateCircularArcs(_count, _num, _rotatingArcs) {
    _rotatingArcs = [];

    for (let i = 1; i < _num + 1; i++) {
        for (let j = 0; j < _count; j++) {
            let p = ((Math.PI * 2) / _count) * j;

            const element = new Arc({
                x: Math.cos(p) * (i * 90) + innerWidth / 2,
                y: Math.sin(p) * (i * 90) + innerHeight / 2,
                r: 12,
                fill: "#099",
            });
            element.rotation = p;
            element.space = i * 90;

            _rotatingArcs.push(element);
        }
    }
}


function rotateArcs(rotatingArcs) {
    rotatingArcs.forEach(_e => {
        _e.draw(ctx);
        _e.rotation += 0.01;
        _e.pos.x = Math.cos(_e.rotation) * _e.space + innerWidth / 2;
        _e.pos.y = Math.sin(_e.rotation) * _e.space + innerHeight / 2;
    });

    rotatingArcs.forEach((_e, _i) => {
        if (
            Game.GetDistance(_e, player) <=
            _e.r + player.r - player.velocity.x
        ) {
            game.WORLD.end = true;
        }
    });
}
