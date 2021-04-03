import { even } from '../math/Common.js';
import { Pattern } from './Pattern.js';
export class StripePattern extends Pattern {
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
        const x = patternPosition.x;
        return even(x) ?
            self.colorA.clone() : self.colorB.clone();
    }
}
//# sourceMappingURL=StripePattern.js.map