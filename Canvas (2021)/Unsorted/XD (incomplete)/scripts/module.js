import Game from "../Game/Game.js";
import FillRect from "../Game/FillRect.js";
import Arc from "../Game/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(innerWidth, innerHeight);

game.setColor("white");

const ctx = game.WORLD.ctx,
    node = game.WORLD.node;

let rotatingArcs = [],
    rectGrid = [],
    gold = new Arc({
        x: innerWidth / 2,
        y: innerHeight / 2,
        r: 12,
        fill: "gold",
    }),
    gold2 = new Arc({
        x: innerWidth / 2 + 200,
        y: innerHeight / 2,
        r: 12,
        fill: "gold",
    }),
    player = new Arc({
        x: 20,
        y: 20,
        r: 12,
        fill: "#555",
    });

function generateCircularArcs(_count, _num) {
    rotatingArcs = [];

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

            rotatingArcs.push(element);
        }
    }
}

function generateRectGrid(_row, _column) {
    for (let c = 0; c < _column; c++) {
        for (let r = 0; r < _row; r++) {
            const arc = new Arc({
                x: r * 70 + game.WORLD.dimensions.w / 2 - (_row * 70) / 2,
                y: c * 70 + game.WORLD.dimensions.h / 2 - (_column * 70) / 2,
                r: 12,
                fill: "cyan",
            });
            arc.velocity.y = Game.getRandom(2, 4);
            rectGrid.push(arc);
        }
    }
}

generateRectGrid(5, 5);
generateCircularArcs(8, 3);

function level1() {
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

    gold.draw(ctx);
    if (Game.GetDistance(player, gold) < gold.r + player.r + 2) {
        game.WORLD.win = true;
    }
}

function level2() {
    rectGrid.forEach(_ => {
        _.draw(ctx);
        _.pos.y += _.velocity.y;

        if (
            rectGrid[rectGrid.length - 1].pos.y > game.WORLD.dimensions.h ||
            rectGrid[0].pos.y < 0
        ) {
            _.velocity.y = -_.velocity.y;
        }
    });

    rectGrid.forEach(_e => {
        if (
            Game.GetDistance(_e, player) <=
            _e.r + player.r - player.velocity.x
        ) {
            game.WORLD.end = true;
        }
    });

    gold2.draw(ctx);
    if (Game.GetDistance(player, gold2) < gold2.r + player.r + 2) {
        game.WORLD.win = true;
    }
}

function level3() {}

game.levels.push(level1);
game.levels.push(level2);

function playerLogic() {
    if (Game.Keyboard.arrows.down) {
        player.pos.y += player.velocity.y;
    }

    if (Game.Keyboard.arrows.left) {
        player.pos.x -= player.velocity.x;
    }

    if (Game.Keyboard.arrows.right) {
        player.pos.x += player.velocity.x;
    }

    if (Game.Keyboard.arrows.up) {
        player.pos.y -= player.velocity.y;
    }
}

function update() {
    player.draw(ctx);
    playerLogic();

    game.levels[game.WORLD.incrementors.levelIndicator]();
}

animate();

function animate() {
    let anime = requestAnimationFrame(animate);
    game.clear();

    update();

    if (game.WORLD.win)
        ++game.WORLD.incrementors.levelIndicator,
            (game.WORLD.win = false),
            (player.pos.x = 20),
            (player.pos.y = 20);

    if (game.WORLD.end) cancelAnimationFrame(anime);
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.reset(_e));
node.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e));
node.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e));
node.addEventListener("touchend", _e => Game.Mouse.disable());
node.addEventListener("mouseup", _e => Game.Mouse.disable());
node.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e));
node.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e));
window.addEventListener("resize", Game.onResize);
