import {
    Canvas,
    Color,
    Point,
    Ray,
    Sphere,
    Vector,
} from "../../src/ray-tracer.js";

export class FlatSphere {
    constructor(
        public canvas: Canvas,
        private _padding: number) { }

    paint(color: Color, origin: Point, sphere: Sphere) {
        const canvas = this.canvas;
        const padding = this._padding;
        const ray = new Ray(origin, new Vector(0, 0, -1));

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
                canvas.paintPixel(x, y, color);
            }
        }
    }
}
