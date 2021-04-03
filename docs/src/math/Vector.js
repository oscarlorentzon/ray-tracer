import { equals } from './Common.js';
export class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 0;
    }
    add(v) {
        const self = this;
        self.x += v.x;
        self.y += v.y;
        self.z += v.z;
        self.w += v.w;
        return self;
    }
    clone() {
        const self = this;
        return new Vector(self.x, self.y, self.z);
    }
    copy(v) {
        const self = this;
        self.x = v.x;
        self.y = v.y;
        self.z = v.z;
        self.w = v.w;
        return self;
    }
    cross(v) {
        const self = this;
        const x = self.y * v.z - self.z * v.y;
        const y = self.z * v.x - self.x * v.z;
        const z = self.x * v.y - self.y * v.x;
        self.x = x;
        self.y = y;
        self.z = z;
        return self;
    }
    dot(v) {
        const self = this;
        const x = self.x * v.x;
        const y = self.y * v.y;
        const z = self.z * v.z;
        return x + y + z;
    }
    equals(v) {
        const self = this;
        return equals(self.x, v.x) &&
            equals(self.y, v.y) &&
            equals(self.z, v.z) &&
            equals(self.w, v.w);
    }
    mulMatrix3(m) {
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
    mulMatrix4(m) {
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
    mulScalar(s) {
        const self = this;
        self.x *= s;
        self.y *= s;
        self.z *= s;
        self.w *= s;
        return self;
    }
    negate() {
        const self = this;
        self.x = -self.x;
        self.y = -self.y;
        self.z = -self.z;
        self.w = -self.w;
        return self;
    }
    norm() {
        const self = this;
        const x = self.x;
        const y = self.y;
        const z = self.z;
        const w = self.w;
        return Math.hypot(x, y, z, w);
    }
    normalize() {
        const self = this;
        const norm = self.norm();
        const s = 1 / norm;
        return this.mulScalar(s);
    }
    reflect(normal) {
        const self = this;
        const normalScale = 2 * self.clone().dot(normal);
        return self.sub(normal.clone().mulScalar(normalScale));
    }
    sub(v) {
        const self = this;
        self.x -= v.x;
        self.y -= v.y;
        self.z -= v.z;
        self.w -= v.w;
        return self;
    }
    toArray() {
        const self = this;
        return [self.x, self.y, self.z, self.w];
    }
}
//# sourceMappingURL=Vector.js.map