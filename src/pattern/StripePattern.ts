import { even } from '../math/Common.js';
import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class StripePattern extends Pattern {
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
        const x = patternPosition.x;
        return even(x) ?
            self.colorA.clone() : self.colorB.clone();
    }
}
