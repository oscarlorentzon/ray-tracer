import { SceneObject } from "../objects/SceneObject.js";
import { Intersection } from "./Intersection.js";
import { Ray } from "./Ray.js";

export class RayTracer {
    constructor(public readonly ray: Ray) { }

    /**
     * Determine the hit.
     * @description Requires an intersection array
     * sorted in ascending order based on time.
     * @param intersections Array of intersections
     * sored in ascending order based on time.
     */
    hit(intersections: Array<Intersection>): Intersection {
        if (intersections.length === 0) { return null; }
        for (const i of intersections) {
            if (i.t > 0) {
                return i;
            }
        }
        return null;
    }

    /**
     * Intersect scene objects.
     * @param objects Scene objects to intersect.
     * @returns {Array<Intersection>} Array of intersections
     * sorted in ascending order on time.
     */
    intersect(objects: Array<SceneObject>): Array<Intersection> {
        const ray = this.ray;
        const intersections: Array<Intersection> = [];
        for (const object of objects) {
            const ts = object.intersect(ray);
            for (const t of ts) {
                intersections.push(new Intersection(t, object));
            }
        }
        return intersections
            .sort((i1, i2) => {
                return i1.t < i2.t ?
                    -1 :
                    i1.t === i2.t ?
                        0 : 1;
            });
    }
}
