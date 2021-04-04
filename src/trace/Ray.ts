import { Matrix4 } from '../math/Matrix4.js';
import { Point } from '../math/Point.js';
import { Vector } from '../math/Vector.js';

export class Ray {
    constructor(
        public readonly origin: Point,
        public readonly direction: Vector) { }

    clone(): Ray {
        const self = this;
        return new Ray(
            self.origin.clone(),
            self.direction.clone());
    }

    copy(r: Ray): Ray {
        const self = this;
        const o = self.origin;
        o.copy(r.origin);
        const d = self.direction;
        d.copy(r.direction);
        return self;
    }

    position(t: number): Point {
        const self = this;
        const translation = self.direction
            .clone()
            .mulScalar(t);

        return self.origin
            .clone()
            .addVector(translation);
    }

    applyMatrix(m: Matrix4): Ray {
        const self = this;

        self.origin
            .mulMatrix4(m);
        self.direction
            .mulMatrix4(m);

        return self;
    }
}
