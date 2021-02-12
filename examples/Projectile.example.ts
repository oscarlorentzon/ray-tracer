import {
    Canvas,
    Color,
    Point,
    Vector,
} from "../src/ray-tracer.js";
import { writeFile } from "./util/IO.js";

class Projectile {
    constructor(
        public position: Point,
        public velocity: Vector) { }
}

class Environment {
    constructor(
        public gravity: Vector,
        public wind: Vector) { }
}

function launch() {
    const position = new Point(0, 0, 0);
    const velocity = new Vector(1.1, 1, 0)
        .normalize()
        .mulScalar(1.3e-2);
    const projectile = new Projectile(position, velocity);

    const gravity = new Vector(0, -1, 0).mulScalar(6.9e-5);
    const wind = new Vector(-1, 0, 0).mulScalar(5e-5);
    const environment = new Environment(gravity, wind);

    const tick = (p: Projectile, e: Environment) => {
        p.position.addVector(p.velocity);
        p.velocity
            .add(e.gravity)
            .add(e.wind);
    };

    const canvasW = 256;
    const canvasH = 128;
    const canvas = new Canvas(canvasW, canvasH);
    const projectileColor = new Color(1, 1, 1);

    while (projectile.position.y >= 0) {
        const canvasX = Math.round(canvasW * projectile.position.x);
        const canvasY = Math.round(canvasH * (1 - projectile.position.y));
        canvas.setPixel(canvasX, canvasY, projectileColor);
        tick(projectile, environment);
    }

    return canvas;
}

async function write(canvas: Canvas) {
    const ppm = canvas.toPpm();
    try {
        await writeFile('projectile.ppm', ppm);
    } catch (error) {
        console.error(error);
    }
}

(async function main() {
    const canvas = launch();
    await write(canvas);
})();
