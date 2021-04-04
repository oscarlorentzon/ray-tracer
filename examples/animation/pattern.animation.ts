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
    StripePattern,
    GradientPattern,
    BlendPattern,
    SceneObject,
    SolidPattern,
} from '../../src/ray-tracer.js';
import {
    animateMultiple,
    FrameWriter,
} from '../frame/Frame.js';
import { freeFaller } from '../frame/GravityGenerator.js';
import {
    LookAt,
    planeOrbiter,
} from '../frame/LookAtGenerator.js';
import {
    Wave,
    waveGenerator,
} from '../frame/WaveGenerator.js';
import { PerlinPattern } from '../pattern/PerlinPattern.js';
import { RadialPattern } from '../pattern/RadialPattern.js';
import {
    ORANGE,
    RED,
    SILVER,
    WHITE,
    YELLOW,
} from '../util/Color.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from '../util/IO.js';

const ANIMATION_PATH = 'pattern/ppm/animation/';

function createLight(
    position: Point,
    intensity: number): PointLight {
    return new PointLight(
        position,
        new Color(intensity, intensity, intensity));
}

function pupulateScene(scene: Scene) {
    const wallParameters: PhongMaterialParameters = {
        diffuse: 0.5,
        specular: 0.5,
        shininess: 20,
        pattern: new PerlinPattern(
            new BlendPattern(
                new StripePattern(WHITE, SILVER),
                new StripePattern(WHITE, SILVER)
                    .setPatternToObject(new Matrix4().fromRotationY(Math.PI / 2)),
                0.5)
                .setPatternToObject(new Matrix4().fromRotationY(Math.PI / 4))),
    };
    const walls = [
        { rx: Math.PI / 2, rz: 0, tx: 0, tz: -20, },
        { rx: 0, rz: -Math.PI / 2, tx: 20, tz: 0 },
        { rx: -Math.PI / 2, rz: 0, tx: 0, tz: 20 },
        { rx: 0, rz: Math.PI / 2, tx: -20, tz: 0 },
    ].map(t =>
        new Plane(
            new PhongMaterial(wallParameters))
            .setObjectToWorld(
                new Matrix4()
                    .mul(new Matrix4().fromRotationX(t.rx))
                    .mul(new Matrix4().fromRotationZ(t.rz))
                    .mul(new Matrix4().fromTranslation(t.tx, 0, t.tz))));

    scene.objects.push(...walls);

    const lights = [
        createLight(new Point(-5, 10, 10), 0.7),
        createLight(new Point(1, 5, 10), 0.2),
        createLight(new Point(-20, 40, -20), 0.1),
    ];
    scene.ligths.push(...lights);
}

function createPlanet(): SceneObject {
    const planetParameters: PhongMaterialParameters = {
        ambient: 0.25,
        pattern: new GradientPattern(YELLOW, RED)
            .setPatternToObject(
                new Matrix4()
                    .mul(new Matrix4().fromScale(2, 2, 2))
                    .mul(new Matrix4().fromTranslation(-1, 0, 0))
                    .mul(new Matrix4().fromRotationZ(Math.PI / 2))),
    };
    const planet = new Sphere(new PhongMaterial(planetParameters))
        .setObjectToWorld(
            new Matrix4()
                .mul(new Matrix4().fromScale(2, 3, 2))
                .mul(new Matrix4().fromTranslation(0, 15, 0)));
    return planet;
}

function createWater(): SceneObject {
    const waterParameters: PhongMaterialParameters = {
        shininess: 20,
        specular: 0.5,
        diffuse: 0.5,
        pattern: new BlendPattern(
            new SolidPattern(WHITE),
            new PerlinPattern(
                new RadialPattern([
                    WHITE,
                    RED,
                    ORANGE,
                    YELLOW,
                    WHITE,
                ])),
            0),
    };
    const water = new Plane(new PhongMaterial(waterParameters));
    return water;
}

async function generate() {
    const scene = new Scene();
    pupulateScene(scene);
    const planet = createPlanet();
    const water = createWater();
    scene.objects.push(...[planet, water]);
    const blendPattern = <BlendPattern>water.material.pattern;
    const waterPattern = (<PerlinPattern>blendPattern.patternB).pattern;

    const renderer = new Renderer();
    const canvas = new Canvas(128, 128);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);
    const position = new Point(5, 10, 15);
    const center = new Point(0, 2, 0);

    const writer: FrameWriter<[LookAt, number, Wave]> =
        async (frameId, [lookAt, displacementY, wave]) => {
            await new Promise<void>((resolve) => {
                camera.lookAt(lookAt.from, lookAt.to, lookAt.up);
                planet.setObjectToWorld(planet.objectToWorld
                    .clone()
                    .mul(new Matrix4().fromTranslation(0, displacementY, 0)));

                blendPattern.blend = wave.blend;
                const scale = wave.waveScale;
                waterPattern.setPatternToObject(
                    new Matrix4().fromScale(scale, scale, scale));

                renderer.render(scene, camera, canvas);
                resolve();
            });

            const ppm = await canvasToPpm(canvas);
            const filename = `pattern-${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const animations = [{
        frames: 64,
        generators: [
            planeOrbiter(position, center),
            freeFaller(16),
            waveGenerator(22, 1.5, 1.2),
        ],
    }];

    await animateMultiple(animations, writer);
    endLine();
}

(async function main() {
    await mkdirp(ANIMATION_PATH);
    await generate();
})();
