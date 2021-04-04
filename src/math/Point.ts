import { equals } from './Common.js';
import { Matrix3 } from './Matrix3.js';
import { Matrix4 } from './Matrix4.js';
import { Vector } from './Vector.js';

export class Point {
    public w: number;
    constructor(
        public x: number,
        public y: number,
        public z: number) {
        this.w = 1;
    }

    addVector(v: Vector): Point {
        const self = this;
        self.x += v.x;
        self.y += v.y;
        self.z += v.z;
        self.w += v.w;
        return self;
    }

    clone(): Point {
        const self = this;
        return new Point(self.x, self.y, self.z);
    }

    copy(p: Point): Point {
        const self = this;
        self.x = p.x;
        self.y = p.y;
        self.z = p.z;
        self.w = p.w;
        return self;
    }

    equals(p: Point): boolean {
        const self = this;
        return equals(self.x, p.x) &&
            equals(self.y, p.y) &&
            equals(self.z, p.z) &&
            equals(self.w, p.w);
    }

    mulMatrix3(m: Matrix3): Point {
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

    mulMatrix4(m: Matrix4): Point {
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

    mulScalar(s: number): Point {
        const self = this;
        self.x *= s;
        self.y *= s;
        self.z *= s;
        self.w *= s;
        return self;
    }

    sub(p: Point): Vector {
        const self = this;
        const x = self.x - p.x;
        const y = self.y - p.y;
        const z = self.z - p.z;
        return new Vector(x, y, z);
    }

    subVector(v: Vector): Point {
        const self = this;
        self.x -= v.x;
        self.y -= v.y;
        self.z -= v.z;
        self.w -= v.w;
        return self;
    }
}
