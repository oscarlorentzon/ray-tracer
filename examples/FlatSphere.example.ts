import {
    Canvas,
    Point,
    Color,
    Sphere,
} from "../src/ray-tracer.js";
import {
    hueRotator,
    lightnessDecreaser,
    lightnessIncreaser,
} from "./generator/ColorGenerator.js";
import { FlatSphere } from "./painters/FlatSphere.js";
import {
    generate,
    FrameWriter,
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
    const sphere = new Sphere();
    const origin = new Point(0, 0, 5);
    const flatSphere = new FlatSphere(new Canvas(128, 128), 16);

    const writer: FrameWriter<Color> = async (frameId, color) => {
        flatSphere.canvas.clear();
        await new Promise<void>((resolve) => {
            flatSphere.paint(color, origin, sphere);
            resolve();
        });
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
