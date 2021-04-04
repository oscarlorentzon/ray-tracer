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
        const self = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(self.patternToObjectInverse);
        const colorA = self.patternA.getColor(patternPosition);
        const colorB = self.patternB.getColor(patternPosition);
        const t = self.blend;
        return colorA.lerp(colorB, t);
    }
}
