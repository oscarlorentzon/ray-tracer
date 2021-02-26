import {
    Canvas,
    Point,
    Color,
    Sphere,
    Ray,
    Vector,
} from "../src/ray-tracer.js";
import {
    generate,
    Generator,
    Writer,
    zeroPad,
} from "./util/Frame.js";
import {
    canvasToPpm,
    mkdirp,
    writeFile,
} from "./util/IO.js";

class FlatSphere {
    constructor(
        public canvas: Canvas,
        private _padding: number) { }

    paint(color: Color, origin: Point, sphere: Sphere) {
        const canvas = this.canvas;
        const padding = this._padding;
        const ray = new Ray(origin, new Vector(0, 0, -1));

        const w = canvas.width;
        const h = canvas.height;

        const wallW = 2 * (1 + padding / w);
        const wallH = 2 * (1 + padding / h);
        const wallLeftX = -wallW / 2;
        const walltopY = wallH / 2;

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; x++) {
                ray.direction.x = wallLeftX + x * wallW / w;
                ray.direction.y = walltopY - y * wallH / h;
                ray.direction.z = -1 * ray.origin.z;
                ray.direction.normalize();
                const ts = sphere.intersect(ray);
                if (ts.length === 0) { continue; }
                canvas.paintPixel(x, y, color);
            }
        }
    }
}

function paintFlatSphere(
    flatSphere: FlatSphere,
    options: FlatSphereOptions): Promise<void> {
    return new Promise((resolve) => {
        flatSphere.paint(options.color, options.origin, options.sphere);
        resolve();
    })
}

type FlatSphereOptions = {
    width: number;
    height: number;
    color: Color;
    origin: Point;
    sphere: Sphere;
    filename: string;
}

const FLAT_SPHERE_PATH = 'flat-sphere/ppm/';

async function writeFlatSphere(options: FlatSphereOptions): Promise<void> {
    const canvas = new Canvas(options.width, options.height);
    const flatSphere = new FlatSphere(canvas, 16);
    await paintFlatSphere(flatSphere, options);
    const ppm = await canvasToPpm(flatSphere.canvas);
    await writeFile(`${FLAT_SPHERE_PATH}${options.filename}`, ppm);
}

function hsvToRgb(h: number, s: number, v: number): Color {
    h = 180 * h / Math.PI;
    const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    return new Color(f(5), f(3), f(1));
}

async function generateFrames(
    frames: number,
    frameOffset: number,
    generator: Generator<Color>): Promise<void> {
    const writer: Writer<Color> = (frameId, color) => writeFlatSphere({
        width: 128,
        height: 128,
        color,
        origin: new Point(0, 0, 5),
        sphere: new Sphere,
        filename: `clock_${zeroPad(frameId, 4)}.ppm`,
    })
    await generate(frames, frameOffset, generator, writer);
}

(async function main() {
    const lightnessIncreaser: Generator<Color> =
        (frame, frames) => {
            const r = frame / frames;
            const color = new Color(r, 0, 0);
            return color;
        };

    const lightnessDecreaser: Generator<Color> =
        (frame, frames) => {
            const r = (frames - frame) / frames;
            const color = new Color(r, 0, 0);
            return color;
        };

    const hueRotator: Generator<Color> =
        (frame, frames) => {
            const c = frame / frames;
            const hue = 2 * Math.PI * c;
            const saturation = 1;
            const value = 1;
            const color = hsvToRgb(hue, saturation, value);
            return color;
        };

    await mkdirp(FLAT_SPHERE_PATH);
    await generateFrames(60, 0, lightnessIncreaser);
    await generateFrames(120, 60, hueRotator);
    await generateFrames(60, 180, lightnessDecreaser);
})();
