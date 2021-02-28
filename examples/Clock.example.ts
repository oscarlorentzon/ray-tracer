import {
    Canvas,
    Matrix,
} from "../src/ray-tracer.js";
import {
    downscaleGenerator,
    rotationGenerator,
    skewGenerator,
    upscaleGenerator,
} from "./frame/TransformGenerator.js";
import { Clock } from "./painters/Clock.js";
import {
    generateFrames,
    FrameWriter,
} from "./frame/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from "./util/IO.js";

const CLOCK_PATH = 'clock/ppm/';

(async function main() {
    const clock = new Clock(new Canvas(512, 512), 64);

    const writer: FrameWriter<Matrix> = async (frameId, transform) => {
        clock.face.clear();
        await new Promise<void>((resolve) => {
            clock.paint(transform);
            resolve();
        });
        const ppm = await canvasToPpm(clock.face);
        const filename = `clock_${zeroPad(frameId, 4)}.ppm`;
        await writeFile(`${CLOCK_PATH}${filename}`, ppm);
    };

    await mkdirp(CLOCK_PATH);
    await generateFrames(60, 0, upscaleGenerator, writer);
    await generateFrames(60, 60, rotationGenerator, writer);
    await generateFrames(60, 120, skewGenerator, writer);
    await generateFrames(60, 180, downscaleGenerator, writer);
    await generateFrames(1, 240, upscaleGenerator, writer);
    endLine();
})();
