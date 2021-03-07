import { Scene } from "../scene/Scene.js";
import { RayTracer } from "../trace/RayTracer.js";
import { Color } from "./Color.js";

export class Renderer {
    private readonly _clearColor: Color;
    constructor() {
        this._clearColor = new Color(0, 0, 0);
    }

    render(scene: Scene, raytracer: RayTracer): Color {
        const ray = raytracer.ray;
        ray.direction.normalize();
        const intersections = raytracer
            .intersect(scene.objects);
        const hit = raytracer.hit(intersections);
        const color = this._clearColor.clone();
        if (!hit) { return color; }

        const t = hit.t;
        const object = hit.object;
        const position = ray.position(t);
        const normal = object.getNormal(position);
        const eye = ray.origin
            .clone()
            .sub(position)
            .normalize();

        const normalEyeAngle = normal.dot(eye);
        if (normalEyeAngle < 0) { normal.mulScalar(-1); }

        for (const light of scene.ligths) {
            color.add(
                object.material.lighting(
                    light,
                    position,
                    eye,
                    normal));
        }
        return color;
    }
}
