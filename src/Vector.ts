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
        const x2 = x * x;
        const y2 = y * y;
        const z2 = z * z;
        const w2 = w * w;
        return Math.sqrt(x2 + y2 + z2 + w2);
    }

    normalize(): Vector {
        const t = this;
        const norm = t.norm();
        const s = 1 / norm;
        return this.mulScalar(s);
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
