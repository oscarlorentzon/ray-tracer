import { SceneObject } from "../objects/SceneObject.js";
import { Intersection } from "./Intersection.js";
import { Ray } from "./Ray.js";

export class RayTracer {
    constructor(public readonly ray: Ray) { }

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
