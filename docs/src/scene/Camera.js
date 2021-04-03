import { Matrix4 } from '../math/Matrix4.js';
import { Point } from '../math/Point.js';
export class Camera {
    constructor(verticalFov, aspect) {
        this.verticalFov = verticalFov;
        this.aspect = aspect;
        this.viewMatrix = new Matrix4();
        this.viewMatrixInverse = new Matrix4();
    }
    lookAt(from, to, up) {
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
    apply(viewportX, viewportY, ray) {
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
            .mulMatrix4(this.viewMatrixInverse);
        const direction = ray.direction;
        direction.x = cameraPoint.x - origin.x;
        direction.y = cameraPoint.y - origin.y;
        direction.z = cameraPoint.z - origin.z;
        direction.w = 0;
        direction.normalize();
    }
}
//# sourceMappingURL=Camera.js.map