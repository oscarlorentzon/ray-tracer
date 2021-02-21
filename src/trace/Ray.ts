import { Point } from "../math/Point";
import { Vector } from "../math/Vector";

export class Ray {
    constructor(
        public readonly origin: Point,
        public readonly direction: Vector) { }

    position(t: number): Point {
        const th = this;
        const translation = th.direction
            .clone()
            .mulScalar(t);

        return th.origin
            .clone()
            .addVector(translation);
    }
}
