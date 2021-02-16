import {
    Canvas,
    Color,
    Point,
    Vector,
} from "../src/ray-tracer.js";
import {
    canvasToPpm,
    mkdirp,
    writeFile
} from "./util/IO.js";

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

function createProjectile(): Projectile {
    const position = new Point(0, 0, 0);
    const velocity = new Vector(1.1, 1, 0)
        .normalize()
        .mulScalar(1.3e-2);
    return new Projectile(position, velocity);
}

function createEnvironment(): Environment {
    const gravity = new Vector(0, -1, 0).mulScalar(6.9e-5);
    const wind = new Vector(-1, 0, 0).mulScalar(5e-5);
    return new Environment(gravity, wind);
}

function paintParabola(
    projectile: Projectile,
    environment: Environment,
    canvas: Canvas): void {
    const tick = (p: Projectile, e: Environment) => {
        p.position.addVector(p.velocity);
        p.velocity
            .add(e.gravity)
            .add(e.wind);
    };

    const projectileColor = new Color(1, 1, 1);
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    while (projectile.position.y >= 0) {
        const canvasX = Math.round(canvasW * projectile.position.x);
        const canvasY = Math.round(canvasH * (1 - projectile.position.y));
        canvas.paintPixel(canvasX, canvasY, projectileColor);
        tick(projectile, environment);
    }
}

const PROJECTILE_PATH = 'projectile/ppm/';

(async function main() {
    const projectile = createProjectile();
    const environment = createEnvironment();
    const canvas = new Canvas(256, 128);
    paintParabola(projectile, environment, canvas);
    const ppm = await canvasToPpm(canvas);
    await mkdirp(PROJECTILE_PATH);
    await writeFile(`${PROJECTILE_PATH}projectile.ppm`, ppm);
})();
