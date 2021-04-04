import { equals } from './Common.js';
import { Matrix3 } from './Matrix3.js';
import { Matrix4 } from './Matrix4.js';

export class Vector {
    public w: number;
    constructor(
        public x: number,
        public y: number,
        public z: number) {
        this.w = 0;
    }

    add(v: Vector): Vector {
        const self = this;
        self.x += v.x;
        self.y += v.y;
        self.z += v.z;
        self.w += v.w;
        return self;
    }

    clone(): Vector {
        const self = this;
        return new Vector(self.x, self.y, self.z);
    }

    copy(v: Vector): Vector {
        const self = this;
        self.x = v.x;
        self.y = v.y;
        self.z = v.z;
        self.w = v.w;
        return self;
    }

    cross(v: Vector): Vector {
        const self = this;
        const x = self.y * v.z - self.z * v.y;
        const y = self.z * v.x - self.x * v.z;
        const z = self.x * v.y - self.y * v.x;
        self.x = x;
        self.y = y;
        self.z = z;
        return self;
    }

    dot(v: Vector): number {
        const self = this;
        const x = self.x * v.x;
        const y = self.y * v.y;
        const z = self.z * v.z;
        return x + y + z;
    }

    equals(v: Vector): boolean {
        const self = this;
        return equals(self.x, v.x) &&
            equals(self.y, v.y) &&
            equals(self.z, v.z) &&
            equals(self.w, v.w);
    }

    mulMatrix3(m: Matrix3): Vector {
        const self = this;
        const x = self.x;
        const y = self.y;
        const z = self.z;
        const me = m.entries;
        self.x = me[0] * x + me[1] * y + me[2] * z;
        self.y = me[3] * x + me[4] * y + me[5] * z;
        self.z = me[6] * x + me[7] * y + me[8] * z;
        return self;
    }

    mulMatrix4(m: Matrix4): Vector {
        const self = this;
        const x = self.x;
        const y = self.y;
        const z = self.z;
        const w = self.w;
        const me = m.entries;
        self.x = me[0] * x + me[1] * y + me[2] * z + me[3] * w;
        self.y = me[4] * x + me[5] * y + me[6] * z + me[7] * w;
        self.z = me[8] * x + me[9] * y + me[10] * z + me[11] * w;
        self.w = me[12] * x + me[13] * y + me[14] * z + me[15] * w;
        return self;
    }

    mulScalar(s: number): Vector {
        const self = this;
        self.x *= s;
        self.y *= s;
        self.z *= s;
        self.w *= s;
        return self;
    }

    negate(): Vector {
        const self = this;
        self.x = -self.x;
        self.y = -self.y;
        self.z = -self.z;
        self.w = -self.w;
        return self;
    }

    norm(): number {
        const self = this;
        const x = self.x;
        const y = self.y;
        const z = self.z;
        const w = self.w;
        return Math.hypot(x, y, z, w);
    }

    normalize(): Vector {
        const self = this;
        const norm = self.norm();
        const s = 1 / norm;
        return this.mulScalar(s);
    }

    reflect(normal: Vector): Vector {
        const self = this;
        const normalScale = 2 * self.clone().dot(normal);
        return self.sub(normal.clone().mulScalar(normalScale));
    }

    sub(v: Vector): Vector {
        const self = this;
        self.x -= v.x;
        self.y -= v.y;
        self.z -= v.z;
        self.w -= v.w;
        return self;
    }

    toArray(): Array<number> {
        const self = this;
        return [self.x, self.y, self.z, self.w];
    }
}
