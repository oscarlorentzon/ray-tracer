import {
    Canvas,
    Point,
    Camera,
    Renderer,
    Scene,
    Matrix4,
    PhongMaterialParameters,
    Vector,
    StripePattern,
    GradientPattern,
    Checker3DPattern,
    RadialGradientPattern,
    BlendPattern,
} from '../../src/ray-tracer.js';
import { PerlinPattern } from '../pattern/PerlinPattern.js';
import { RandomPattern } from '../pattern/RandomPattern.js';
import * as Create from '../scene/Creator.js';
import {
    WHITE,
    BLACK,
    GRAY,
} from '../util/Color.js';
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

const PATH = 'pattern/ppm/';

function createScene(): Scene {
    const stripeRotate = new StripePattern(WHITE, GRAY);
    stripeRotate.setPatternToObject(
        new Matrix4().mul(
            new Matrix4().fromRotationY(-Math.PI / 2)));
    const stripeScale = new StripePattern(WHITE, BLACK);
    stripeScale
        .setPatternToObject(
            new Matrix4().fromScale(0.25, 0.25, 0.25));
    const stripeTranslate = new StripePattern(WHITE, BLACK);
    stripeTranslate
        .setPatternToObject(
            new Matrix4()
                .mul(new Matrix4().fromRotationZ(Math.PI / 4))
                .mul(new Matrix4().fromRotationX(-Math.PI / 2))
                .mul(new Matrix4().fromTranslation(4.5, 0, 0)));

    const blend = new BlendPattern(
        stripeRotate,
        new StripePattern(WHITE, GRAY), 0.5);
    blend.setPatternToObject(
        new Matrix4().mul(
            new Matrix4().fromRotationY(Math.PI / 4)));

    const radialGradient = new RadialGradientPattern(WHITE, GRAY);
    radialGradient.setPatternToObject(
        new Matrix4().fromScale(2, 1, 2));

    const checker3D = new Checker3DPattern(WHITE, BLACK);
    checker3D
        .setPatternToObject(
            new Matrix4().fromScale(0.5, 0.5, 0.5));

    const gradient = new GradientPattern(WHITE, BLACK);
    gradient
        .setPatternToObject(
            new Matrix4()
                .fromScale(2, 2, 2)
                .mul(new Matrix4().fromTranslation(-1, 0, 0)));

    const spheres = [
        Create.sphere(
            {
                shininess: 20,
                pattern: new PerlinPattern(checker3D),
            },
            new Matrix4()
                .mul(new Matrix4().fromTranslation(3, 1, 5))),
        Create.sphere(
            {
                shininess: 20,
                pattern: new PerlinPattern(stripeScale),
            },
            new Matrix4()
                .mul(new Matrix4().fromRotationZ(Math.PI / 6))
                .mul(new Matrix4().fromRotationY(Math.PI / 3))
                .mul(new Matrix4().fromTranslation(0.5, 1, 0))),
        Create.sphere(
            {
                shininess: 50,
                pattern: new PerlinPattern(stripeTranslate),
            },
            new Matrix4()
                .fromScale(2, 2, 2)
                .mul(new Matrix4().fromTranslation(-2.5, 2, 2))),
        Create.sphere(
            {
                shininess: 50,
                pattern: gradient,
            },
            new Matrix4().fromTranslation(3, 1, 0)),
        Create.sphere(
            {
                shininess: 50,
                pattern: new RandomPattern(checker3D),
            },
            new Matrix4().fromTranslation(6, 1, 1)),
    ];

    const materialParams: PhongMaterialParameters = {
        shininess: 20,
        specular: 0.5,
        diffuse: 0.5,
    };
    const planes = [
        Create.plane(
            materialParams,
            new PerlinPattern(radialGradient),
            new Matrix4()),
        Create.plane(
            materialParams,
            new PerlinPattern(blend),
            new Matrix4()
                .mul(new Matrix4().fromRotationX(Math.PI / 2))
                .mul(new Matrix4().fromTranslation(0, 0, -20))),
        Create.plane(
            materialParams,
            new PerlinPattern(blend),
            new Matrix4()
                .mul(new Matrix4().fromRotationZ(Math.PI / 2))
                .mul(new Matrix4().fromTranslation(20, 0, 0))),
        Create.plane(
            materialParams,
            new PerlinPattern(blend),
            new Matrix4()
                .mul(new Matrix4().fromRotationZ(-Math.PI / 2))
                .mul(new Matrix4().fromTranslation(-20, 0, 0))),
    ];

    const lights = [
        Create.pointLight(new Point(-5, 10, 10), 0.7),
        Create.pointLight(new Point(1, 5, 10), 0.3),
    ];

    const scene = new Scene();
    scene.objects.push(...spheres);
    scene.objects.push(...planes);
    scene.ligths.push(...lights);
    return scene;
}

async function generate() {
    const scene = createScene();
    const renderer = new Renderer();
    const canvas = new Canvas(2048, 2048);
    const aspect = canvas.width / canvas.height;
    const vfov = Math.PI / 3;
    const camera = new Camera(vfov, aspect);
    camera.lookAt(
        new Point(5, 7, 15),
        new Point(0, 2, 0),
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

    const filename = 'pattern.ppm';
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
