export class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number) { }

    add(c: Color): Color {
        const t = this;
        t.r += c.r;
        t.g += c.g;
        t.b += c.b;
        return t;
    }

    clone(): Color {
        const t = this;
        return new Color(t.r, t.g, t.b);
    }

    fromArray(a: Array<number>): Color {
        const t = this;
        t.r = a[0];
        t.g = a[1];
        t.b = a[2];
        return t;
    }

    mulScalar(s: number): Color {
        const t = this;
        t.r *= s;
        t.g *= s;
        t.b *= s;
        return t;
    }

    schur(c: Color): Color {
        const t = this;
        t.r *= c.r;
        t.g *= c.g;
        t.b *= c.b;
        return t;
    }

    sub(c: Color): Color {
        const t = this;
        t.r -= c.r;
        t.g -= c.g;
        t.b -= c.b;
        return t;
    }
}
