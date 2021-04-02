import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class BlendPattern extends Pattern {
    constructor(
        public readonly patternA: Pattern,
        public readonly patternB: Pattern,
        public blend: number) {
        super();
    }

    getColor(objectPosition: Point): Color {
        const th = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(th.patternToObjectInverse);
        const colorA = th.patternA.getColor(patternPosition);
        const colorB = th.patternB.getColor(patternPosition);
        const t = th.blend;
        return colorA.lerp(colorB, t);
    }
}
