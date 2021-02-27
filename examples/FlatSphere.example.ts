import {
    Canvas,
    Point,
    Color,
    Sphere,
} from "../src/ray-tracer.js";
import { FlatSphere } from "./painters/FlatSphere.js";
import { hsvToRgb } from "./util/Color.js";
import {
    generate,
    Generator,
    Writer,
    zeroPad,
} from "./util/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
} from "./util/IO.js";

const FLAT_SPHERE_PATH = 'flat-sphere/ppm/';

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

    const paintFlatSphere = (
        flatSphere: FlatSphere,
        color: Color,
        origin: Point,
        sphere: Sphere): Promise<void> => {
        return new Promise((resolve) => {
            flatSphere.paint(color, origin, sphere);
            resolve();
        });
    };

    const sphere = new Sphere();
    const origin = new Point(0, 0, 5);
    const flatSphere = new FlatSphere(new Canvas(128, 128), 16);

    const writer: Writer<Color> = async (frameId, color) => {
        flatSphere.canvas.clear();
        await paintFlatSphere(flatSphere, color, origin, sphere);
        const ppm = await canvasToPpm(flatSphere.canvas);
        const filename = `flat-sphere_${zeroPad(frameId, 4)}.ppm`;
        await writeFile(`${FLAT_SPHERE_PATH}${filename}`, ppm);
    };

    await mkdirp(FLAT_SPHERE_PATH);
    await generate(60, 0, lightnessIncreaser, writer);
    await generate(120, 60, hueRotator, writer);
    await generate(60, 180, lightnessDecreaser, writer);
    endLine();
})();
