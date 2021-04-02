import {
    Canvas,
    Matrix4,
} from '../../src/ray-tracer.js';
import {
    downscaleGenerator,
    rotationGenerator,
    skewGenerator,
    upscaleGenerator,
} from '../frame/TransformGenerator.js';
import {
    FrameWriter,
    animate,
} from '../frame/Frame.js';
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from '../util/IO.js';
import { Clock } from '../painter/Clock.js';

const ANIMATION_PATH = 'clock/ppm/animation/';

(async function main() {
    const clock = new Clock(new Canvas(128, 128), 16);

    const writer: FrameWriter<Matrix4> =
        async (frameId, transform) => {
            clock.face.clear();
            await new Promise<void>((resolve) => {
                clock.paint(transform);
                resolve();
            });
            const ppm = await canvasToPpm(clock.face);
            const filename = `clock_${zeroPad(frameId, 4)}.ppm`;
            await writeFile(`${ANIMATION_PATH}${filename}`, ppm);
        };

    const animations = [
        { frames: 60, generator: upscaleGenerator },
        { frames: 60, generator: rotationGenerator },
        { frames: 60, generator: skewGenerator },
        { frames: 60, generator: downscaleGenerator },
        { frames: 1, generator: upscaleGenerator },
    ];

    await mkdirp(ANIMATION_PATH);
    await animate(animations, writer);
    endLine();
})();
