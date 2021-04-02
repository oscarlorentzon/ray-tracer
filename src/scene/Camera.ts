import { Matrix4 } from '../math/Matrix4.js';
import { Point } from '../math/Point.js';
import { Vector } from '../math/Vector.js';
import { Ray } from '../trace/Ray.js';

export class Camera {
    /**
     * View matrix.
     */
    public readonly viewMatrix: Matrix4;
    public readonly viewMatrixInverse: Matrix4;

    constructor(
        public readonly verticalFov: number,
        public readonly aspect: number) {
        this.viewMatrix = new Matrix4();
        this.viewMatrixInverse = new Matrix4();
    }

    lookAt(from: Point, to: Point, up: Vector): Camera {
        if (from.equals(to)) {
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

        this.viewMatrixInverse
            .fromArray(this.viewMatrix.toArray())
            .invert();

        return this;
    }

    apply(
        viewportX: number,
        viewportY: number,
        ray: Ray): void {
        const fov = this.verticalFov;
        const aspect = this.aspect;

        const halfHeight = Math.tan(fov / 2);
        const worldX = viewportX * aspect * halfHeight;
        const worldY = viewportY * halfHeight;
        const worldPoint = new Point(worldX, worldY, -1);
        const viewMatrixInverse = this.viewMatrixInverse;

        const origin = ray.origin;
        origin.x = 0;
        origin.y = 0;
        origin.z = 0;
        origin.w = 1;
        origin.mulMatrix4(viewMatrixInverse);

        const cameraPoint = worldPoint
            .mulMatrix4(this.viewMatrixInverse)

        const direction = ray.direction;
        direction.x = cameraPoint.x - origin.x;
        direction.y = cameraPoint.y - origin.y;
        direction.z = cameraPoint.z - origin.z;
        direction.w = 0;
        direction.normalize();
    }
}
