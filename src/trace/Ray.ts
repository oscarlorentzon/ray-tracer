import { Matrix4 } from "../math/Matrix4.js";
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

    copy(r: Ray): Ray {
        const t = this;
        const o = t.origin;
        o.copy(r.origin);
        const d = t.direction;
        d.copy(r.direction);
        return t;
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

    applyMatrix(m: Matrix4): Ray {
        const t = this;

        t.origin
            .mulMatrix4(m);
        t.direction
            .mulMatrix4(m);

        return t;
    }
}
