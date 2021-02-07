import {
    Point,
    Vector,
} from "../src/ray-tracer.js";

class Projectile {
    constructor(
        public postition: Point,
        public velocity: Vector) { }
}

class Environment {
    constructor(
        public gravity: Vector,
        public wind: Vector) { }
}

const postition = new Point(0, 1, 0);
const velocity = new Vector(1, 1, 0).normalize();
const projectile = new Projectile(postition, velocity);

const gravity = new Vector(0, -0.1, 0);
const wind = new Vector(-0.01, 0, 0);
const environment = new Environment(gravity, wind);

const tick = (p: Projectile, e: Environment) => {
    p.postition.addVector(p.velocity);
    p.velocity.add(e.gravity).add(e.wind);
};

let ticks = 0;
while (projectile.postition.y > 0) {
    tick(projectile, environment);
    ticks++;
    console.log(ticks, projectile.postition, projectile.velocity);
}
