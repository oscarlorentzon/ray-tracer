import { even, frac } from '../math/Common.js';
import { Pattern } from './Pattern.js';
export class RadialGradientPattern extends Pattern {
    constructor(colorA, colorB) {
        super();
        this.colorA = colorA;
        this.colorB = colorB;
    }
    getColor(objectPosition) {
        const self = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(self.patternToObjectInverse);
        const colorA = self.colorA;
        const colorB = self.colorB;
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
//# sourceMappingURL=RadialGradientPattern.js.map