import { Matrix } from "../math/Matrix.js";
import { Point } from "../math/Point.js";
import { Ray } from "../trace/Ray.js";
import { SceneObject } from "./SceneObject.js";

export class Sphere extends SceneObject {
    public readonly objectToWorld;
    public readonly objectToWorldInverse;
    public readonly position;
    constructor() {
        super();
        this.objectToWorld = new Matrix();
        this.objectToWorldInverse = new Matrix();
        this.position = new Point(0, 0, 0);
    }

    intersect(r: Ray): Array<number> {
        const t = this;
        const rt = r
            .clone()
            .applyMatrix(t.objectToWorldInverse);
        const direction = rt.direction;
        const origin = rt.origin;
        const position = t.position;
        const sphereToRay = origin
            .clone()
            .sub(position);

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
