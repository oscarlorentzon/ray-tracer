import {
    Canvas,
    Point,
    Sphere,
    PhongMaterial,
    PointLight,
} from '../../src/ray-tracer.js';
import { Sphere3D } from '../painter/Sphere3D.js';
import {
    animate,
    FrameWriter,
} from '../frame/Frame.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from '../util/IO.js';
import { dayArc } from '../frame/PointLightGenerator.js';

const ANIMATION_PATH = 'sphere3d/ppm/animation/';

async function generate() {
    const sphere = new Sphere(new PhongMaterial());
    sphere.material.shininess = 20;
    const eyePosition = new Point(0, 0, 5);
    const sphere3D = new Sphere3D(new Canvas(128, 128), 8);

    const writer: FrameWriter<PointLight> =
        async (frameId, light) => {
            sphere3D.canvas.clear();
            await new Promise<void>((resolve) => {
                sphere3D.paint(eyePosition, sphere, light);
                resolve();
            });
            const ppm = await canvasToPpm(sphere3D.canvas);
            const filename = `sphere3d_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const animations = [{
        frames: 150,
        generator: dayArc(
            new Point(0, -10, 4),
            new Point(0, 0, 0)),
    }];

    await animate(animations, writer);
    endLine();
}

(async function main() {
    await mkdirp(ANIMATION_PATH);
    await generate();
})();
