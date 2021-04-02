import {
    Canvas,
    Point,
    Color,
    Sphere,
    PhongMaterial,
} from '../../src/ray-tracer.js';
import {
    hueRotator,
    lightnessDecreaser,
    lightnessIncreaser,
} from '../frame/ColorGenerator.js';
import { FlatSphere } from '../painter/FlatSphere.js';
import {
    FrameWriter,
    animate,
} from '../frame/Frame.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from '../util/IO.js';

const ANIMATION_PATH = 'flat-sphere/ppm/animation/';

(async function main() {
    const sphere = new Sphere(new PhongMaterial());
    const origin = new Point(0, 0, 5);
    const flatSphere = new FlatSphere(new Canvas(128, 128), 8);

    const writer: FrameWriter<Color> =
        async (frameId, color) => {
            flatSphere.canvas.clear();
            await new Promise<void>((resolve) => {
                flatSphere.paint(color, origin, sphere);
                resolve();
            });
            const ppm = await canvasToPpm(flatSphere.canvas);
            const filename = `flat-sphere_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const animations = [
        { frames: 60, generator: lightnessIncreaser },
        { frames: 120, generator: hueRotator },
        { frames: 60, generator: lightnessDecreaser },
    ];

    await mkdirp(ANIMATION_PATH);
    await animate(animations, writer);
    endLine();
})();
