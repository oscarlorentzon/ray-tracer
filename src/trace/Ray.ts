import { Matrix } from "../math/Matrix.js";
import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";

export class Ray {
    constructor(
        public readonly origin: Point,
        public readonly direction: Vector) { }

    clone(): Ray {
        const t = this;
        return new Ray(
            t.origin.clone(),
            t.direction.clone());
    }

    position(t: number): Point {
        const th = this;
        const translation = th.direction
            .clone()
            .mulScalar(t);

        return th.origin
            .clone()
            .addVector(translation);
    }

    applyMatrix(m: Matrix): Ray {
        const t = this;

        t.origin
            .mulMatrix(m);
        t.direction
            .mulMatrix(m);

        return t;
    }
}
