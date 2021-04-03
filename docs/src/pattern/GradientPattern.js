import { frac } from '../math/Common.js';
import { Pattern } from './Pattern.js';
export class GradientPattern extends Pattern {
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
        const t = frac(patternPosition.x);
        return colorA
            .clone()
            .lerp(colorB, t);
    }
}
//# sourceMappingURL=GradientPattern.js.map