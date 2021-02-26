import {
    Canvas,
    Point,
    Matrix,
    Color,
} from "../src/ray-tracer.js";
import {
    generateTransforms,
    TransformGenerator,
    TransformWriter,
    zeroPad,
} from "./util/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
} from "./util/IO.js";

class Clock {
    constructor(
        public face: Canvas,
        private _padding: number) { }

    paint(transform: Matrix) {
        const face = this.face;
        const hourLength = Math.round((face.width + face.height) / 64);
        const minuteLength = Math.round(hourLength / 3);

        const travelMinute = new Matrix()
            .fromRotationZ(-Math.PI / 30);
        const travelHour = new Matrix()
            .fromRotationZ(-Math.PI / 6);
        const minuteColor = new Color(0.6, 0.6, 0.6);
        const hourColor = new Color(1, 1, 1);

        const hand = new Point(0, 1, 0);

        for (let minute = 0; minute < 60; ++minute) {
            this._paintTick(hand, minuteColor, minuteLength, transform);
            hand.mulMatrix(travelMinute);
        }

        for (let hour = 0; hour < 12; ++hour) {
            this._paintTick(hand, hourColor, hourLength, transform);
            hand.mulMatrix(travelHour);
        }
    }

    private _paintTick(
        hand: Point,
        color: Color,
        length: number,
        transform: Matrix): void {
        const face = this.face;
        const centerX = face.width / 2;
        const centerY = face.height / 2;
        const outerRadiusX = face.width / 2 - this._padding;
        const outerRadiusY = face.height / 2 - this._padding;

        for (let dist = 0; dist <= length; ++dist) {
            const radiusX = outerRadiusX - dist;
            const radiusY = outerRadiusY - dist;
            const scaling = new Matrix()
                .fromScale(radiusX, radiusY, 1);
            const ts = new Matrix()
                .mul(scaling)
                .mul(transform);
            const transformedHand = hand
                .clone()
                .mulMatrix(ts);

            face.paintPixel(
                Math.round(centerX + transformedHand.x),
                Math.round(centerY - transformedHand.y),
                color);
        }
    }
}

function paintClock(
    clock: Clock,
    transform: Matrix): Promise<void> {
    return new Promise((resolve) => {
        clock.paint(transform);
        resolve();
    })
}

type ClockOptions = {
    width: number;
    height: number;
    transform: Matrix;
    filename: string;
}

const CLOCK_PATH = 'clock/ppm/';

async function writeClock(options: ClockOptions): Promise<void> {
    const canvas = new Canvas(options.width, options.height);
    const clock = new Clock(canvas, 64);
    await paintClock(clock, options.transform);
    const ppm = await canvasToPpm(clock.face);
    await writeFile(`${CLOCK_PATH}${options.filename}`, ppm);
}

async function generateFrames(
    frames: number,
    frameOffset: number,
    generator: TransformGenerator,): Promise<void> {
    const writer: TransformWriter = (frameId, transform) => writeClock({
        width: 512,
        height: 512,
        transform,
        filename: `clock_${zeroPad(frameId, 4)}.ppm`,
    })
    await generateTransforms(frames, frameOffset, generator, writer);
}

(async function main() {
    const upscaleGenerator: TransformGenerator =
        (frame, frames) => {
            const s = frame / frames;
            const transform = new Matrix()
                .fromScale(s, s, s);
            return transform;
        };

    const rotationGenerator: TransformGenerator =
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

    const skewGenerator: TransformGenerator =
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

    const downscaleGenerator: TransformGenerator =
        (frame, frames) => {
            const s = (frames - frame) / frames;
            const transform = new Matrix()
                .fromScale(s, s, s);
            return transform;
        };

    await mkdirp(CLOCK_PATH);
    await generateFrames(60, 0, upscaleGenerator);
    await generateFrames(60, 60, rotationGenerator);
    await generateFrames(60, 120, skewGenerator);
    await generateFrames(60, 180, downscaleGenerator);
    await generateFrames(1, 240, upscaleGenerator);
    endLine();
})();
