import {
    Canvas,
    Matrix4,
    Point,
    PointLight,
    Ray,
    Sphere,
    Vector,
} from "../../src/ray-tracer.js";

export class Sphere3D {
    constructor(
        public canvas: Canvas,
        private _padding: number) { }

    paint(eyePosition: Point, sphere: Sphere, light: PointLight) {
        const canvas = this.canvas;
        const padding = this._padding;
        const ray = new Ray(eyePosition, new Vector(0, 0, -1));

        const w = canvas.width;
        const h = canvas.height;

        const wallW = 2 * (1 + 2 * padding / w);
        const wallH = 2 * (1 + 2 * padding / h);
        const wallLeftX = -wallW / 2;
        const walltopY = wallH / 2;

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; x++) {
                ray.direction.x = wallLeftX + x * wallW / w;
                ray.direction.y = walltopY - y * wallH / h;
                ray.direction.z = -1 * ray.origin.z;
                ray.direction.normalize();
                const ts = sphere.intersect(ray);
                if (ts.length === 0) { continue; }

                const position = ray.position(ts[0]);
                const normal = sphere.getNormal(position);
                const eye = eyePosition
                    .clone()
                    .sub(position)
                    .normalize();

                const color = sphere.material.lighting(
                    light,
                    position,
                    eye,
                    normal,
                    false,
                    new Matrix4());

                canvas.paintPixel(x, y, color);
            }
        }
    }
}
