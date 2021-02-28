import { Matrix } from "../math/Matrix.js";
import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";
import { Ray } from "../trace/Ray.js";
import { SceneObject } from "./SceneObject.js";

export class Sphere extends SceneObject {
    public readonly objectToWorld;
    public readonly objectToWorldInverse;
    constructor() {
        super();
        this.objectToWorld = new Matrix();
        this.objectToWorldInverse = new Matrix();
    }

    getNormal(p: Point): Vector {
        const worldToObject = this.objectToWorldInverse;
        const objectPoint = p
            .clone()
            .mulMatrix(worldToObject);
        const objectNormal = new Vector(
            objectPoint.x,
            objectPoint.y,
            objectPoint.z);
        const worldNormal = objectNormal
            .mulMatrix(
                this.objectToWorldInverse
                    .clone()
                    .transpose());
        worldNormal.w = 0;
        return worldNormal
            .normalize();
    }

    intersect(r: Ray): Array<number> {
        const rt = r
            .clone()
            .applyMatrix(this.objectToWorldInverse);
        const direction = rt.direction;
        const sphereToRay = new Vector(
            rt.origin.x,
            rt.origin.y,
            rt.origin.z);

        const a = direction.dot(direction);
        const b = 2 * direction.dot(sphereToRay);
        const c = sphereToRay.dot(sphereToRay) - 1;
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) { return []; }

        const sqrtD = Math.sqrt(discriminant);
        const fraction = 1 / (2 * a);
        const t1 = (-b - sqrtD) * fraction;
        const t2 = (-b + sqrtD) * fraction;

        return [t1, t2];
    }

    setObjectToWorld(m: Matrix): void {
        const t = this;
        const a = m.toArray();
        t.objectToWorld.fromArray(a);
        t.objectToWorldInverse.fromArray(a).invert();
    }
}
