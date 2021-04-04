import {
    Pattern,
    Color,
    Common,
    Interpolation,
    Point,
} from '../../src/ray-tracer.js';

const clamp = Common.clamp;
const inverseLerp = Interpolation.inverseLerp;

export class RadialPattern extends Pattern {
    private readonly _colors: Array<Color>;
    constructor(colors: Array<Color>) {
        super();
        this._colors = colors.slice();
        this._colors.push(colors[colors.length - 1]);
    }

    getColor(objectPosition: Point): Color {
        const self = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(self.patternToObjectInverse);
        const r = Math.hypot(patternPosition.x, patternPosition.z);
        const colors = self._colors;
        const value = r * (colors.length - 2);
        const start = clamp(Math.floor(value), 0, colors.length - 2);
        const end = start + 1;
        const t = clamp(inverseLerp(start, end, value), 0, 1);
        const colorA = colors[start];
        const colorB = colors[end];
        return colorA
            .clone()
            .lerp(colorB, t);
    }
}
