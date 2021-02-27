import {
    Canvas,
    Matrix,
} from "../src/ray-tracer.js";
import {
    downscaleGenerator,
    rotationGenerator,
    skewGenerator,
    upscaleGenerator,
} from "./generator/TransformGenerator.js";
import { Clock } from "./painters/Clock.js";
import {
    generate,
    FrameWriter,
    zeroPad,
} from "./util/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
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
    await generate(60, 0, upscaleGenerator, writer);
    await generate(60, 60, rotationGenerator, writer);
    await generate(60, 120, skewGenerator, writer);
    await generate(60, 180, downscaleGenerator, writer);
    await generate(1, 240, upscaleGenerator, writer);
    endLine();
})();
