import {
    Canvas,
    Point,
    Sphere,
    PhongMaterial,
    PointLight,
    Color,
    Camera,
    Renderer,
    Scene,
    Matrix4,
    PhongMaterialParameters,
    Vector,
} from "../src/ray-tracer.js";
import {
    animate,
    FrameWriter,
} from "./frame/Frame.js";
import {
    LookAt,
    originOrbit,
} from "./frame/LookAtGenerator.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from "./util/IO.js";
import {
    measureTime,
    Stopwatch,
} from "./util/Stopwatch.js";

const PATH = 'sphere-scene/ppm/';
const ANIMATION_PATH = `${PATH}animation/`;

function createSphere(
    materialParameters: PhongMaterialParameters,
    transform: Matrix4): Sphere {
    const material = new PhongMaterial(materialParameters);
    const sphere = new Sphere(material);
    sphere.setObjectToWorld(transform);
    return sphere;
}

function createLight(
    position: Point,
    intensity: number): PointLight {
    return new PointLight(
        position,
        new Color(intensity, intensity, intensity));
}

function populateScene(scene: Scene): void {
    const spheres = [
        createSphere(
            { shininess: 100, color: new Color(1, 1, 0) },
            new Matrix4().fromTranslation(-1, 0, 0.5)),
        createSphere(
            { shininess: 20, color: new Color(1, 0, 1) },
            new Matrix4().fromTranslation(0.5, 0, -1)),
        createSphere(
            { shininess: 300, color: new Color(0, 1, 1) },
            new Matrix4().fromTranslation(2, 0, -3)),
    ];

    const lights = [
        createLight(new Point(-3, 0, 10), 0.5),
        createLight(new Point(-13, 10, 10), 0.3),
        createLight(new Point(3, 10, -10), 0.2),
    ];

    scene.objects.push(...spheres);
    scene.ligths.push(...lights);
}

async function generateAnimation() {
    const scene = new Scene();
    populateScene(scene);

    const renderer = new Renderer();
    const canvas = new Canvas(128, 128);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);

    const writer: FrameWriter<LookAt> =
        async (frameId, lookAt) => {
            camera.lookAt(lookAt.from, lookAt.to, lookAt.up);
            await new Promise<void>((resolve) => {
                renderer.render(scene, camera, canvas);
                resolve();
            });
            const ppm = await canvasToPpm(canvas);
            const filename = `sphere_scene_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const animations = [{
        frames: 150,
        generator: originOrbit(5),
    }];

    await animate(animations, writer);
    endLine();
}

async function generateHighResolution() {
    const scene = new Scene();
    populateScene(scene);

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
    await mkdirp(ANIMATION_PATH);
    await generateAnimation();
    await generateHighResolution();
})();
