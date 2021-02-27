import {
    Canvas,
    Matrix,
} from "../src/ray-tracer.js";
import { Clock } from "./painters/Clock.js";
import {
    generate,
    Generator,
    Writer,
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
    const upscaleGenerator: Generator<Matrix> =
        (frame, frames) => {
            const s = frame / frames;
            const transform = new Matrix()
                .fromScale(s, s, s);
            return transform;
        };

    const rotationGenerator: Generator<Matrix> =
        (frame, frames) => {
            const rY = 2 * Math.PI * frame / frames;
            const rotationY = new Matrix()
                .fromRotationY(rY);

            const frameX = frame - frames / 2;
            const rX = Math.max(0, 2 * Math.PI * frameX / frames);
            const rotationX = new Matrix()
                .fromRotationX(rX);
            const transform = new Matrix()
                .mul(rotationY)
                .mul(rotationX);
            return transform;
        };

    const skewGenerator: Generator<Matrix> =
        (frame, frames) => {
            const frameMaxXY = frames / 2;
            const frameXY = -(Math.abs(frame - frameMaxXY) - frameMaxXY);
            const xy = 1.4 * frameXY / frames;

            const frameStartYX = frames / 2;
            const frameMaxYX = (frames - frameStartYX) / 2;
            const frameYX = Math.max(
                -(Math.abs(frame - frameMaxYX - frameStartYX) - frameMaxYX),
                0);
            const yx = 1.8 * frameYX / frames;
            const transform = new Matrix()
                .fromSkew(xy, 0, yx, 0, 0, 0);
            return transform;
        };

    const downscaleGenerator: Generator<Matrix> =
        (frame, frames) => {
            const s = (frames - frame) / frames;
            const transform = new Matrix()
                .fromScale(s, s, s);
            return transform;
        };

    const paintClock = (clock: Clock, transform: Matrix): Promise<void> => {
        return new Promise((resolve) => {
            clock.paint(transform);
            resolve();
        });
    };

    const clock = new Clock(new Canvas(512, 512), 64);

    const writer: Writer<Matrix> = async (frameId, transform) => {
        clock.face.clear();
        await paintClock(clock, transform);
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
