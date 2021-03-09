import { equals } from "./Common.js";
import { Matrix3 } from "./Matrix3.js";
import { Matrix4 } from "./Matrix4.js";

export class Vector {
    public w: number;
    constructor(
        public x: number,
        public y: number,
        public z: number) {
        this.w = 0;
    }

    add(v: Vector): Vector {
        const t = this;
        t.x += v.x;
        t.y += v.y;
        t.z += v.z;
        t.w += v.w;
        return t;
    }

    clone(): Vector {
        const t = this;
        return new Vector(t.x, t.y, t.z);
    }

    cross(v: Vector): Vector {
        const t = this;
        const x = t.y * v.z - t.z * v.y;
        const y = t.z * v.x - t.x * v.z;
        const z = t.x * v.y - t.y * v.x;
        t.x = x;
        t.y = y;
        t.z = z;
        return t;
    }

    dot(v: Vector): number {
        const t = this;
        const x = t.x * v.x;
        const y = t.y * v.y;
        const z = t.z * v.z;
        return x + y + z;
    }

    equals(v: Vector): boolean {
        const t = this;
        return equals(t.x, v.x) &&
            equals(t.y, v.y) &&
            equals(t.z, v.z) &&
            equals(t.w, v.w);
    }

    mulMatrix3(m: Matrix3): Vector {
        const t = this;
        const x = t.x;
        const y = t.y;
        const z = t.z;
        const me = m.entries;
        t.x = me[0] * x + me[1] * y + me[2] * z;
        t.y = me[3] * x + me[4] * y + me[5] * z;
        t.z = me[6] * x + me[7] * y + me[8] * z;
        return t;
    }

    mulMatrix4(m: Matrix4): Vector {
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
        return t;
    }

    mulScalar(s: number): Vector {
        const t = this;
        t.x *= s;
        t.y *= s;
        t.z *= s;
        t.w *= s;
        return t;
    }

    negate(): Vector {
        const t = this;
        t.x = -t.x;
        t.y = -t.y;
        t.z = -t.z;
        t.w = -t.w;
        return t;
    }

    norm(): number {
        const t = this;
        const x = t.x;
        const y = t.y;
        const z = t.z;
        const w = t.w;
        return Math.hypot(x, y, z, w);
    }

    normalize(): Vector {
        const t = this;
        const norm = t.norm();
        const s = 1 / norm;
        return this.mulScalar(s);
    }

    reflect(normal: Vector): Vector {
        const t = this;
        const normalScale = 2 * t.clone().dot(normal);
        return t.sub(normal.clone().mulScalar(normalScale));
    }

    sub(v: Vector): Vector {
        const t = this;
        t.x -= v.x;
        t.y -= v.y;
        t.z -= v.z;
        t.w -= v.w;
        return t;
    }
}
