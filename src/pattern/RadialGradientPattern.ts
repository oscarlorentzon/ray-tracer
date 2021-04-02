import { even, frac } from '../math/Common.js';
import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class RadialGradientPattern extends Pattern {
    constructor(
        public readonly colorA: Color,
        public readonly colorB: Color) {
        super();
    }

    getColor(objectPosition: Point): Color {
        const th = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(th.patternToObjectInverse);
        const colorA = th.colorA;
        const colorB = th.colorB;
        const r = Math.hypot(patternPosition.x, patternPosition.z);
        const t = frac(r);
        const e = even(r);
        const start = e ? colorA : colorB;
        const end = e ? colorB : colorA;
        return start
            .clone()
            .lerp(end, t);
    }
}
