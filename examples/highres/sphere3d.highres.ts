import {
    Canvas,
    Point,
    Sphere,
    PhongMaterial,
    PointLight,
    Color,
    SolidPattern,
} from '../../src/ray-tracer.js';
import { Sphere3D } from '../painter/Sphere3D.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
} from '../util/IO.js';
import {
    measureTime,
    Stopwatch,
} from '../util/Stopwatch.js';

const PATH = 'sphere3d/ppm/';

async function generate() {
    const sphere = new Sphere(
        new PhongMaterial({
            pattern: new SolidPattern(new Color(1, 0, 1)),
            shininess: 50,
        }));
    const eyePosition = new Point(0, 0, 5);
    const sphere3D = new Sphere3D(new Canvas(4096, 4096), 128);
    const stopwatch = new Stopwatch(
        sphere3D.canvas.width,
        sphere3D.canvas.height);

    const pointLight = new PointLight(
        new Point(10, 10, 10),
        new Color(1, 1, 1));

    await measureTime(
        () => new Promise<void>((resolve) => {
            sphere3D.paint(eyePosition, sphere, pointLight);
            resolve();
        }),
        'Paint canvas', stopwatch);

    const ppm = await measureTime(
        () => canvasToPpm(sphere3D.canvas),
        'To PPM', stopwatch);

    const filename = `sphere3d_high.ppm`;
    await measureTime(
        () => writeFile(`${PATH}${filename}`, ppm),
        'Write file', stopwatch);

    endLine();
    stopwatch.log();
}

(async function main() {
    await mkdirp(PATH);
    await generate();
})();
