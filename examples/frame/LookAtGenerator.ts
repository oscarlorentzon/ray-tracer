import {
    Matrix4,
    Point,
    Vector,
} from "../../src/ray-tracer.js";
import { FrameGenerator } from "./Frame.js";

export type LookAt = {
    from: Point;
    to: Point;
    up: Vector;
}

export function originOrbiter(
    distance: number): FrameGenerator<LookAt> {
    const start = new Point(0, 0, distance);
    const to = new Point(0, 0, 0);
    const up = new Vector(0, 1, 0);
    const rotation = new Matrix4();

    return (frame, frames) => {
        const s = frame / frames;
        rotation
            .fromRotationY(2 * Math.PI * s);
        const from = start
            .clone()
            .mulMatrix4(rotation);

        return { from, to, up };
    };
}

export function planeOrbiter(
    position: Point,
    center: Point): FrameGenerator<LookAt> {
    const to = center.clone();
    const up = new Vector(0, 1, 0);
    const rotation = new Matrix4();

    return (frame, frames) => {
        const s = frame / frames;
        rotation
            .fromRotationY(2 * Math.PI * s);
        const from = position
            .clone()
            .mulMatrix4(rotation);

        return { from, to, up };
    };
}
