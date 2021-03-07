import { EPSILON } from "../math/Common.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";

export class Camera {
    /**
     * View matrix.
     */
    public readonly viewMatrix: Matrix4;
    constructor() { this.viewMatrix = new Matrix4(); }

    lookAt(from: Point, to: Point, up: Vector): Camera {
        if (Math.abs(from.x - to.x) < EPSILON &&
            Math.abs(from.y - to.y) < EPSILON &&
            Math.abs(from.z - to.z) < EPSILON) {
            this.viewMatrix.identity();
            return this;
        }

        const forward = from
            .clone()
            .sub(to)
            .normalize();
        const right = up
            .clone()
            .cross(forward)
            .normalize();
        const trueUp = forward
            .clone()
            .cross(right)
            .normalize();

        const orientation = new Matrix4()
            .fromArray([
                right.x, right.y, right.z, 0,
                trueUp.x, trueUp.y, trueUp.z, 0,
                forward.x, forward.y, forward.z, 0,
                0, 0, 0, 1,
            ]);

        this.viewMatrix
            .fromTranslation(-from.x, -from.y, -from.z)
            .mul(orientation);

        return this;
    }
}
