import {
    Camera,
    Color,
    Coordinates,
    Matrix4,
    PhongMaterial,
    Plane,
    Point,
    PointLight,
    Ray,
    RayTracer,
    Renderer,
    Scene,
    Sphere,
    Vector,
} from '../src/ray-tracer.js';
import {
    RequestContract,
    RenderRequestContract,
    SizeRequestContract,
} from './contracts/RequestContract.js';
import { ResponseContract } from './contracts/ResponseContract.js';

const ctx: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;

const scene = new Scene();
const sphere = new Sphere(new PhongMaterial());
sphere.setObjectToWorld(new Matrix4().fromTranslation(0, 1, 0));
const plane = new Plane(new PhongMaterial());
const light = new PointLight(
    new Point(2, 5, 5),
    new Color(1, 1, 1));
scene.objects.push(sphere, plane);
scene.ligths.push(light);

const raytracer = new RayTracer(
    new Ray(
        new Point(0, 0, 0),
        new Vector(0, 0, -1)));
const renderer = new Renderer();

ctx.onmessage = (event: MessageEvent<RequestContract>) => {
    const type = event.data.type;

    if (type === 'render') {
        render(event.data.params);
    }
}

function render(params: RenderRequestContract): void {
    const size = params.size;
    const camera = new Camera(Math.PI / 3, size.width / size.height);
    camera.lookAt(
        new Point(0, 1, 5),
        new Point(0, 1, 0),
        new Vector(0, 1, 0));

    const ray = raytracer.ray;

    const t0 = performance.now();
    const dts = [];
    for (let y = 0; y < size.height; ++y) {
        const dt0 = performance.now();
        const pixels = new Uint8ClampedArray(4 * size.width);
        for (let x = 0; x < size.width; ++x) {
            const [viewportX, viewportY] =
                Coordinates.canvasToViewport(
                    x + 0.5,
                    y + 0.5,
                    size.width,
                    size.height);
            camera.apply(viewportX, viewportY, ray);
            const color = renderer.renderPixel(scene, raytracer);
            const i = 4 * x;
            pixels[i + 0] = Math.floor(255 * color.r);
            pixels[i + 1] = Math.floor(255 * color.g);
            pixels[i + 2] = Math.floor(255 * color.b);
            pixels[i + 3] = 255;
        }
        const buffer = pixels.buffer;
        const message: ResponseContract = {
            params: { buffer: buffer, y },
            type: 'pixelrow',
        };
        const dt1 = performance.now();
        dts.push(dt1 - dt0);
        ctx.postMessage(message, [buffer]);
    }
    log(size, performance.now() - t0, dts);
}

function log(size: SizeRequestContract, dt: number, dts: Array<number>): void {
    const w = size.width;
    const h = size.height;
    console.log(`Render size: ${w} x ${h} px`);

    const mp = 1e-6 * w * h;
    const elapsedMs = dts.reduce((acc, curr) => acc + curr, 0);
    const elapsedS = elapsedMs / 1e3;
    const mpPerS = (mp / elapsedS).toFixed(3);
    const s = elapsedS.toFixed(3);
    console.log(`Render time: ${s} s (${mpPerS} mp / s)`);

    const rS = (dt / 1e3).toFixed(3);
    console.log(`Render round trip time (incl. messages): ${rS} s`);
}
