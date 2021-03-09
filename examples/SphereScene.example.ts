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
} from "../src/ray-tracer.js";
import { animate, FrameWriter } from "./frame/Frame.js";
import { LookAt, originOrbit } from "./frame/LookAtGenerator.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from "./util/IO.js";

const SPHERE_SCENE_PATH = 'sphere-scene/ppm/';

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
            new Matrix4().fromTranslation(2, 0, -2.5)),
    ];

    const lights = [
        createLight(new Point(0, 0, 1.5), 0.5),
        createLight(new Point(3, 10, -10), 0.3),
        createLight(new Point(-10, 10, 10), 0.2),
    ];

    scene.objects.push(...spheres);
    scene.ligths.push(...lights);
}

async function generate() {
    const scene = new Scene();
    populateScene(scene);

    const canvas = new Canvas(128, 128);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);
    const renderer = new Renderer();

    const writer: FrameWriter<LookAt> =
        async (frameId, lookAt) => {
            camera.lookAt(lookAt.from, lookAt.to, lookAt.up);
            await new Promise<void>((resolve) => {
                renderer.render(scene, camera, canvas);
                resolve();
            });
            const ppm = await canvasToPpm(canvas);
            const filename = `sphere_scene_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${SPHERE_SCENE_PATH}${filename}`, ppm);
        };

    const animations = [{
        frames: 150,
        generator: originOrbit(5),
    }];

    await animate(animations, writer);
    endLine();
}

(async function main() {
    await mkdirp(SPHERE_SCENE_PATH);
    await generate();
})();
