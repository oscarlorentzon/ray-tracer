import {
    Canvas,
    Point,
    Sphere,
    PhongMaterial,
    PointLight,
    Color,
} from "../src/ray-tracer.js";
import { Sphere3D } from "./painters/Sphere3D.js";
import {
    animate,
    FrameWriter,
} from "./frame/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from "./util/IO.js";
import { dayArc } from "./frame/PointLightGenerator.js";
import {
    measureTime,
    Stopwatch,
} from "./util/Stopwatch.js";

const SPHERE3D_PATH = 'sphere3d/ppm/';

async function generateAnimation() {
    const sphere = new Sphere(new PhongMaterial());
    sphere.material.shininess = 20;
    const eyePosition = new Point(0, 0, 5);
    const sphere3D = new Sphere3D(new Canvas(128, 128), 8);

    const writer: FrameWriter<PointLight> = async (frameId, light) => {
        sphere3D.canvas.clear();
        await new Promise<void>((resolve) => {
            sphere3D.paint(eyePosition, sphere, light);
            resolve();
        });
        const ppm = await canvasToPpm(sphere3D.canvas);
        const filename = `sphere3d_${zeroPad(frameId, 4)}.ppm`;
        await writeFile(`${SPHERE3D_PATH}${filename}`, ppm);
    };

    const animations = [{
        frames: 150,
        generator: dayArc(
            new Point(0, -10, 4),
            new Point(0, 0, 0))
    }];

    await animate(animations, writer);
    endLine();
}

async function generateLarge() {
    const sphere = new Sphere(new PhongMaterial());
    sphere.material.shininess = 50;
    sphere.material.color.r = 1;
    sphere.material.color.g = 0;
    sphere.material.color.b = 1;
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

    const filename = `sphere3d_large.ppm`;
    await measureTime(
        () => writeFile(`${SPHERE3D_PATH}${filename}`, ppm),
        'Write file', stopwatch);

    endLine();
    stopwatch.log();
}

(async function main() {
    await mkdirp(SPHERE3D_PATH);
    await generateAnimation();
    await generateLarge();
})();
