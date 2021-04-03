import { Point } from '../math/Point.js';
import { Vector } from '../math/Vector.js';
import { Ray } from '../trace/Ray.js';
import { RayTracer } from '../trace/RayTracer.js';
import { Color } from './Color.js';
import { canvasToViewport } from './Coordinates.js';
export class Renderer {
    constructor() {
        this._clearColor = new Color(0, 0, 0);
        this._raytracer = new RayTracer(new Ray(new Point(0, 0, 0), new Vector(0, 0, -1)));
        this._shadowTracer = new RayTracer(new Ray(new Point(0, 0, 0), new Vector(0, 0, -1)));
    }
    render(scene, camera, canvas) {
        const raytracer = this._raytracer;
        const ray = raytracer.ray;
        const width = canvas.width;
        const height = canvas.height;
        const renderPixel = this.renderPixel.bind(this);
        for (let canvasY = 0; canvasY < height; ++canvasY) {
            for (let canvasX = 0; canvasX < width; ++canvasX) {
                const [viewportX, viewportY] = canvasToViewport(canvasX + 0.5, canvasY + 0.5, width, height);
                camera.apply(viewportX, viewportY, ray);
                const color = renderPixel(scene, raytracer);
                canvas.paintPixel(canvasX, canvasY, color);
            }
        }
    }
    renderPixel(scene, raytracer) {
        const ray = raytracer.ray;
        ray.direction.normalize();
        const objects = scene.objects;
        const intersections = raytracer
            .intersect(objects);
        const hit = raytracer.hit(intersections);
        const color = this._clearColor.clone();
        if (!hit) {
            return color;
        }
        const t = hit.t;
        const object = hit.object;
        const position = ray.position(t);
        const normal = object.getNormal(position);
        const eye = ray.origin
            .clone()
            .sub(position)
            .normalize();
        const normalEyeAngle = normal.dot(eye);
        if (normalEyeAngle < 0) {
            normal.mulScalar(-1);
        }
        const shadowTracer = this._shadowTracer;
        const occluded = this.occluded;
        for (const light of scene.ligths) {
            const occ = occluded(object, position, light, objects, shadowTracer);
            color.add(object.lighting(light, position, eye, normal, occ));
        }
        return color;
    }
    occluded(object, position, light, objects, raytracer) {
        const direction = position
            .clone()
            .sub(light.position);
        const distance = direction.norm();
        direction.normalize();
        const ray = raytracer.ray;
        ray.origin.copy(light.position);
        ray.direction.copy(direction);
        const intersections = raytracer
            .intersect(objects);
        const hit = raytracer.hit(intersections);
        return !!hit &&
            hit.t < distance &&
            hit.object.uuid != object.uuid;
    }
}
//# sourceMappingURL=Renderer.js.map