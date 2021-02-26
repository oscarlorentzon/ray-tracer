import { SceneObject } from "../objects/SceneObject.js";
import { Intersection } from "./Intersection.js";
import { Ray } from "./Ray.js";

export class RayTracer {
    constructor(public readonly ray: Ray) { }

    hit(intersections: Array<Intersection>): Intersection {
        if (intersections.length === 0) { return null; }

        const hits = intersections
            .filter(i => i.t > 0)
            .sort((i1, i2) => {
                return i1.t < i2.t ?
                    -1 :
                    i1.t === i2.t ?
                        0 : 1;
            });

        if (hits.length === 0) { return null; }
        return hits[0];
    }

    intersect(objects: Array<SceneObject>): Array<Intersection> {
        const ray = this.ray;
        const intersections: Array<Intersection> = [];
        for (const object of objects) {
            const ts = object.intersect(ray);
            for (const t of ts) {
                intersections.push(new Intersection(t, object));
            }
        }
        return intersections;
    }
}
