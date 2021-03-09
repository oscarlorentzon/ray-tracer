import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";
import { Camera } from "../scene/Camera.js";
import { Scene } from "../scene/Scene.js";
import { Ray } from "../trace/Ray.js";
import { RayTracer } from "../trace/RayTracer.js";
import { Canvas } from "./Canvas.js";
import { Color } from "./Color.js";
import { canvasToViewport } from "./Coordinates.js";

export class Renderer {
    private readonly _clearColor: Color;
    private readonly _raytracer: RayTracer;

    constructor() {
        this._clearColor = new Color(0, 0, 0);
        const origin = new Point(0, 0, 0);
        const direction = new Vector(0, 0, -1);
        const ray = new Ray(origin, direction);
        this._raytracer = new RayTracer(ray);
    }

    render(scene: Scene, camera: Camera, canvas: Canvas): void {
        const raytracer = this._raytracer;
        const ray = raytracer.ray;
        const width = canvas.width;
        const height = canvas.height;
        const renderPixel = this.renderPixel.bind(this);
        for (let canvasY = 0; canvasY < height; ++canvasY) {
            for (let canvasX = 0; canvasX < width; ++canvasX) {
                const [viewportX, viewportY] =
                    canvasToViewport(
                        canvasX + 0.5,
                        canvasY + 0.5,
                        width,
                        height);
                camera.apply(viewportX, viewportY, ray);
                const color = renderPixel(scene, raytracer);
                canvas.paintPixel(canvasX, canvasY, color);
            }
        }
    }

    renderPixel(scene: Scene, raytracer: RayTracer): Color {
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
