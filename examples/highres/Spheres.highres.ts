import {
    Canvas,
    Point,
    Camera,
    Renderer,
    Vector,
} from '../../src/ray-tracer.js';
import * as SpheresScene from '../scene/SpheresScene.js';
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

const PATH = 'sphere-scene/ppm/';

async function generate() {
    const scene = SpheresScene.create();
    const renderer = new Renderer();
    const canvas = new Canvas(4096, 4096);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);
    camera.lookAt(
        new Point(0, 0, 5),
        new Point(0, 0, 0),
        new Vector(0, 1, 0));

    const stopwatch = new Stopwatch(
        canvas.width,
        canvas.height);

    await measureTime(
        () => new Promise<void>((resolve) => {
            renderer.render(scene, camera, canvas);
            resolve();
        }),
        'Paint canvas', stopwatch);

    const ppm = await measureTime(
        () => canvasToPpm(canvas),
        'To PPM', stopwatch);

    const filename = `sphere_scene_high.ppm`;
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
