import { frac } from '../math/Common.js';
import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class GradientPattern extends Pattern {
    constructor(
        public readonly colorA: Color,
        public readonly colorB: Color) {
        super();
    }

    getColor(objectPosition: Point): Color {
        const self = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(self.patternToObjectInverse);
        const colorA = self.colorA;
        const colorB = self.colorB;
        const t = frac(patternPosition.x);
        return colorA
            .clone()
            .lerp(colorB, t);
    }
}
