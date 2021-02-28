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
} from "./frame/ColorGenerator.js";
import { FlatSphere } from "./painters/FlatSphere.js";
import {
    generateFrames,
    FrameWriter,
} from "./frame/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
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
    await generateFrames(60, 0, lightnessIncreaser, writer);
    await generateFrames(120, 60, hueRotator, writer);
    await generateFrames(60, 180, lightnessDecreaser, writer);
    endLine();
})();
