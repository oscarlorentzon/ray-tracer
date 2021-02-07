import { Vector } from "./Vector.js";

export class Point {
    public w: number;
    constructor(
        public x: number,
        public y: number,
        public z: number) {
        this.w = 1;
    }

    addVector(v: Vector): Point {
        const t = this;
        t.x += v.x;
        t.y += v.y;
        t.z += v.z;
        t.w += v.w;
        return t;
    }

    mulScalar(s: number): Point {
        const t = this;
        t.x *= s;
        t.y *= s;
        t.z *= s;
        t.w *= s;
        return t;
    }

    sub(p: Point): Vector {
        const t = this;
        const x = t.x - p.x;
        const y = t.y - p.y;
        const z = t.z - p.z;
        return new Vector(x, y, z);
    }

    subVector(v: Vector): Point {
        const t = this;
        t.x -= v.x;
        t.y -= v.y;
        t.z -= v.z;
        t.w -= v.w;
        return t;
    }
}
