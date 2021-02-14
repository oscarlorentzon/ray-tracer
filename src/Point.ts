import { equals } from "./Common.js";
import { Matrix } from "./Matrix.js";
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

    clone(): Point {
        const t = this;
        return new Point(t.x, t.y, t.z);
    }

    equals(p: Point): boolean {
        const t = this;
        return equals(t.x, p.x) &&
            equals(t.y, p.y) &&
            equals(t.z, p.z) &&
            equals(t.w, p.w);
    }

    mulMatrix(m: Matrix): Point {
        const t = this;
        const x = t.x;
        const y = t.y;
        const z = t.z;
        const w = t.w;
        const me = m.entries;
        t.x = me[0] * x + me[1] * y + me[2] * z + me[3] * w;
        t.y = me[4] * x + me[5] * y + me[6] * z + me[7] * w;
        t.z = me[8] * x + me[9] * y + me[10] * z + me[11] * w;
        t.w = me[12] * x + me[13] * y + me[14] * z + me[15] * w;
        return this;
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
