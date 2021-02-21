import { Point } from "../math/Point";
import { Ray } from "../trace/Ray";

export class Sphere {
    public readonly position;
    constructor() { this.position = new Point(0, 0, 0); }

    intersect(r: Ray): Array<number> {
        const direction = r.direction;
        const origin = r.origin;
        const position = this.position;
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
}
