import { lerp } from '../math/Interpolation.js';
export class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    add(c) {
        const self = this;
        self.r += c.r;
        self.g += c.g;
        self.b += c.b;
        return self;
    }
    clone() {
        const self = this;
        return new Color(self.r, self.g, self.b);
    }
    copy(c) {
        const self = this;
        self.r = c.r;
        self.g = c.g;
        self.b = c.b;
        return self;
    }
    fromArray(a) {
        const self = this;
        self.r = a[0];
        self.g = a[1];
        self.b = a[2];
        return self;
    }
    lerp(c, t) {
        const self = this;
        self.r = lerp(self.r, c.r, t);
        self.g = lerp(self.g, c.g, t);
        self.b = lerp(self.b, c.b, t);
        return self;
    }
    mulScalar(s) {
        const self = this;
        self.r *= s;
        self.g *= s;
        self.b *= s;
        return self;
    }
    schur(c) {
        const self = this;
        self.r *= c.r;
        self.g *= c.g;
        self.b *= c.b;
        return self;
    }
    sub(c) {
        const self = this;
        self.r -= c.r;
        self.g -= c.g;
        self.b -= c.b;
        return self;
    }
    toArray() {
        const self = this;
        return [self.r, self.g, self.b];
    }
}
//# sourceMappingURL=Color.js.map