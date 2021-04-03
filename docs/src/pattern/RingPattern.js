import { even } from '../math/Common.js';
import { Pattern } from './Pattern.js';
export class RingPattern extends Pattern {
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
        const r = Math.hypot(patternPosition.x, patternPosition.z);
        return even(r) ?
            self.colorA.clone() : self.colorB.clone();
    }
}
//# sourceMappingURL=RingPattern.js.map