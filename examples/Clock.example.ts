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

    paintTick(hand: Point, color: Color, length: number): void {
        const face = this.face;
        const centerX = face.width / 2;
        const centerY = face.height / 2;
        const radius = centerX - this._padding;
        for (let dist = 0; dist <= length; ++dist) {
            const clockX = centerX + (radius - dist) * hand.x;
            const clockY = centerY - (radius - dist) * hand.y;
            face.paintPixel(
                Math.round(clockX),
                Math.round(clockY),
                color);
        }
    }
}

function paintClock(clock: Clock) {
    const hourLength = Math.round((clock.face.width + clock.face.height) / 64);
    const minuteLength = Math.round(hourLength / 3);

    const travelMinute = new Matrix()
        .fromRotationZ(-Math.PI / 30);
    const travelHour = new Matrix()
        .fromRotationZ(-Math.PI / 6);
    const minuteColor = new Color(0.6, 0.6, 0.6);
    const hourColor = new Color(1, 1, 1);

    const hand = new Point(0, 1, 0);

    for (let minute = 0; minute < 60; ++minute) {
        clock.paintTick(hand, minuteColor, minuteLength);
        hand.mulMatrix(travelMinute);
    }

    for (let hour = 0; hour < 12; ++hour) {
        clock.paintTick(hand, hourColor, hourLength);
        hand.mulMatrix(travelHour);
    }
}

(async function main() {
    const canvas = new Canvas(256, 256);
    const clock = new Clock(canvas, 8);
    paintClock(clock);
    const ppm = await canvasToPpm(clock.face);
    await writeFile('clock.ppm', ppm);
})();
