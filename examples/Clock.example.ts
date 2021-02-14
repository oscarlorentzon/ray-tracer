import {
    canvasToPpm,
    writeFile,
} from "./util/IO.js";
import {
    Canvas,
    Point,
    Matrix,
    Color,
} from "../src/ray-tracer.js";

class Clock {
    constructor(
        public face: Canvas,
        private _padding: number) {
    }

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

async function paintClock(
    clock: Clock,
    skew: Matrix): Promise<void> {
    return new Promise((resolve) => {
        clock.paint(skew);
        resolve();
    })
}

(async function main() {
    const squareClock = new Clock(new Canvas(512, 512), 64);
    const identity = new Matrix();
    await paintClock(squareClock, identity);
    const squarePpm = await canvasToPpm(squareClock.face);
    await writeFile('square-clock.ppm', squarePpm);

    const skewedClock = new Clock(new Canvas(1024, 512), 64);
    const skew = new Matrix()
        .fromSkew(1, 0, 0, 0, 0, 0);
    await paintClock(skewedClock, skew);
    const skewedPpm = await canvasToPpm(skewedClock.face);
    await writeFile('skewed-clock.ppm', skewedPpm);
})();
