import Circle from "./Shapes.js";

const cn = document.getElementById("scene"),
    planetsEl = document.getElementById("planets"),
    ctx = cn.getContext("2d"),
    planets = [
        {
            name: "SUN",
            radius: 15,
            color: "#FCE570",
        },
        {
            name: "MERCURY",
            radius: 4,
            color: "#E5E5E5",
        },
        {
            name: "VENUS",
            radius: 5,
            color: "#FFC649",
        },
        {
            name: "EARTH",
            radius: 4,
            color: "#6B93D6",
        },
        {
            name: "MARS",
            radius: 10,
            color: "#451804",
        },
        {
            name: "JUPITER",
            radius: 10,
            color: "#BCAFB2",
        },
        {
            name: "SATURN",
            radius: 8,
            color: "#AB604A",
        },
        {
            name: "URANUS",
            radius: 7,
            color: "#4FD0E7",
        },
        {
            name: "NEPTUNE",
            radius: 3,
            color: "#5B5DDF",
        },
    ];

let width, height, centerX, centerY;

function resize() {
    centerX = (width = cn.width = innerWidth) * 0.5;
    centerY = (height = cn.height = innerHeight) * 0.5;
}

function generatePlanets() {
    let radius = 0;

    planets.forEach((_planet, _index) => {
        _planet.planet = new Circle({
            distance: radius * 4,
            _rotation: _index,
            x: centerX + radius * 4 * Math.cos(_index),
            y: centerY + radius * 4 * Math.sin(_index),
            fillColor: _planet.color,
            radius: _planet.radius,
        });
        _planet.ring = new Circle({
            stroke: true,
            fillColor: "white",
            radius: _planet.planet.distance,
            x: centerX,
            y: centerY,
        });
        radius += _planet.radius;
    });
}

function init() {
    resize();

    planets.forEach(_planet => {
        planetsEl.innerHTML += "<div>" + _planet.name + "<br/>radius: " + _planet.radius + "</div>";
    });

    generatePlanets();

    loop();
}

function loop() {
    ctx.clearRect(0, 0, width, height);
    planets.forEach(_planet => {
        let planet = _planet.planet;
        _planet.ring.draw(ctx);
        planet.rotation += planet.speed;
        planet.x = centerX + planet.distance * Math.cos(planet.rotation);
        planet.y = centerY + planet.distance * Math.sin(planet.rotation);
        planet.draw(ctx);
    });
    requestAnimationFrame(loop);
}

window.addEventListener("resize", resize);
document.addEventListener("DOMContentLoaded", init);
