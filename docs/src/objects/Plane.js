import { equals } from '../math/Common.js';
import { Vector } from '../math/Vector.js';
import { SceneObject } from './SceneObject.js';
export class Plane extends SceneObject {
    getNormal() {
        const objectNormal = new Vector(0, 1, 0);
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
        if (equals(or.direction.y, 0)) {
            return [];
        }
        const t = -or.origin.y / or.direction.y;
        return [t];
    }
}
//# sourceMappingURL=Plane.js.map