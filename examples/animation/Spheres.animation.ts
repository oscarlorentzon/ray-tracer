import {
    Canvas,
    Camera,
    Renderer,
} from '../../src/ray-tracer.js';
import {
    animate,
    FrameWriter,
} from '../frame/Frame.js';
import {
    LookAt,
    originOrbiter,
} from '../frame/LookAtGenerator.js';
import * as SpheresScene from '../scene/SpheresScene.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from '../util/IO.js';

const ANIMATION_PATH = 'sphere-scene/ppm/animation/';

async function generate() {
    const scene = SpheresScene.create();
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
        generator: originOrbiter(5),
    }];

    await animate(animations, writer);
    endLine();
}

(async function main() {
    await mkdirp(ANIMATION_PATH);
    await generate();
})();
