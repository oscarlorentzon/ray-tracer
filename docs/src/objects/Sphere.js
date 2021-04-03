import { Vector } from '../math/Vector.js';
import { SceneObject } from './SceneObject.js';
export class Sphere extends SceneObject {
    getNormal(p) {
        const objectPoint = p
            .clone()
            .mulMatrix4(this.objectToWorldInverse);
        const objectNormal = new Vector(objectPoint.x, objectPoint.y, objectPoint.z);
        const worldNormal = objectNormal
            .mulMatrix3(this.objectToWorldInverse
            .toMatrix3()
            .transpose());
        return worldNormal
            .normalize();
    }
    intersect(r) {
        const or = r
            .clone()
            .applyMatrix(this.objectToWorldInverse);
        const direction = or.direction;
        const sphereToRay = new Vector(or.origin.x, or.origin.y, or.origin.z);
        const a = direction.dot(direction);
        const b = 2 * direction.dot(sphereToRay);
        const c = sphereToRay.dot(sphereToRay) - 1;
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [];
        }
        const sqrtD = Math.sqrt(discriminant);
        const fraction = 1 / (2 * a);
        const t1 = (-b - sqrtD) * fraction;
        const t2 = (-b + sqrtD) * fraction;
        return [t1, t2];
    }
}
//# sourceMappingURL=Sphere.js.map