import { equals } from '../math/Common.js';
import { Vector } from '../math/Vector.js';
import { Ray } from '../trace/Ray.js';
import { SceneObject } from './SceneObject.js';

export class Plane extends SceneObject {
    getNormal(): Vector {
        const objectNormal = new Vector(0, 1, 0);
        const worldNormal = objectNormal
            .mulMatrix3(
                this.objectToWorldInverse
                    .toMatrix3()
                    .transpose());
        return worldNormal
            .normalize();
    }

    intersect(r: Ray): Array<number> {
        const or = r
            .clone()
            .applyMatrix(this.objectToWorldInverse);

        if (equals(or.direction.y, 0)) { return []; }

        const t = -or.origin.y / or.direction.y;
        return [t];
    }
}
