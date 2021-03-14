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
    Plane,
    Vector,
    SolidPattern,
} from "../src/ray-tracer.js";
import {
    bouncer,
    hitTime,
    distanceFromTime,
    GRAVITY,
} from "./frame/GravityGenerator.js";
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

const PATH = 'plane/ppm/';
const ANIMATION_PATH = `${PATH}animation/`;

function createSphere(
    materialParameters: PhongMaterialParameters,
    transform: Matrix4): Sphere {
    const material = new PhongMaterial(materialParameters);
    const sphere = new Sphere(material);
    sphere.setObjectToWorld(transform);
    return sphere;
}

function createPlane(
    materialParameters: PhongMaterialParameters,
    transform: Matrix4): Plane {

    const material = new PhongMaterial(materialParameters);
    const plane = new Plane(material);
    plane.setObjectToWorld(transform);
    return plane;
}

function createLight(
    position: Point,
    intensity: number): PointLight {
    return new PointLight(
        position,
        new Color(intensity, intensity, intensity));
}

function populateScene(scene: Scene, translations: Array<Matrix4>): void {
    const spheres = translations
        .map(t => createSphere(
            {
                shininess: 100,
                pattern: new SolidPattern(new Color(1, 1, 1)),
            },
            new Matrix4().mul(t)));

    const planes = [
        createPlane(
            {
                shininess: 10,
                pattern: new SolidPattern(new Color(0.2, 0.2, 0.2)),
            },
            new Matrix4()),
    ];

    const lights = [
        createLight(new Point(-5, 10, 10), 0.7),
        createLight(new Point(-13, 10, 10), 0.2),
        createLight(new Point(-3, 20, -5), 0.1),
    ];

    scene.objects.push(...spheres);
    scene.objects.push(...planes);
    scene.ligths.push(...lights);
}

async function generateAnimation() {
    const distance = distanceFromTime(1, 0, -GRAVITY);
    const scene = new Scene();
    populateScene(
        scene,
        [
            new Matrix4()
                .fromTranslation(0, distance + 1, 0),
            new Matrix4()
                .fromTranslation(-1, distanceFromTime(0.5, 0, -GRAVITY) + 1, 5),
            new Matrix4()
                .fromTranslation(2, distanceFromTime(0.5, 0, -GRAVITY) + 1, -4),
        ]);

    const renderer = new Renderer();
    const canvas = new Canvas(128, 128);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);
    camera.lookAt(
        new Point(1, 3, 10),
        new Point(0, 2, 0),
        new Vector(0, 1, 0));

    const writer: FrameWriter<void> =
        async (frameId) => {
            await new Promise<void>((resolve) => {
                renderer.render(scene, camera, canvas);
                resolve();
            });

            const ppm = await canvasToPpm(canvas);
            const filename = `sphere_scene_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const spheres = scene.objects
        .filter(o => o instanceof Sphere);
    const plane = scene.objects.find(o => o instanceof Plane);

    const loopTime = 2 * hitTime(distance, 0, -GRAVITY);
    const fps = 30;
    const frames = Math.floor(loopTime * fps);
    const animations = [{
        frames,
        generator: bouncer(spheres, plane, fps),
    }];

    await animate(animations, writer);
    endLine();
}

(async function main() {
    await mkdirp(ANIMATION_PATH);
    await generateAnimation();
})();
