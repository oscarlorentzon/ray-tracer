import { lerp } from '../math/Interpolation.js';

export class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number) { }

    add(c: Color): Color {
        const self = this;
        self.r += c.r;
        self.g += c.g;
        self.b += c.b;
        return self;
    }

    clone(): Color {
        const self = this;
        return new Color(self.r, self.g, self.b);
    }

    copy(c: Color): Color {
        const self = this;
        self.r = c.r;
        self.g = c.g;
        self.b = c.b;
        return self;
    }

    fromArray(a: Array<number>): Color {
        const self = this;
        self.r = a[0];
        self.g = a[1];
        self.b = a[2];
        return self;
    }

    lerp(c: Color, t: number): Color {
        const self = this;
        self.r = lerp(self.r, c.r, t);
        self.g = lerp(self.g, c.g, t);
        self.b = lerp(self.b, c.b, t);
        return self;
    }

    mulScalar(s: number): Color {
        const self = this;
        self.r *= s;
        self.g *= s;
        self.b *= s;
        return self;
    }

    schur(c: Color): Color {
        const self = this;
        self.r *= c.r;
        self.g *= c.g;
        self.b *= c.b;
        return self;
    }

    sub(c: Color): Color {
        const self = this;
        self.r -= c.r;
        self.g -= c.g;
        self.b -= c.b;
        return self;
    }

    toArray(): Array<number> {
        const self = this;
        return [self.r, self.g, self.b];
    }
}
