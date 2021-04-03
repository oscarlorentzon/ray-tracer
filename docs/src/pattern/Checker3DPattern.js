import { even } from '../math/Common.js';
import { Pattern } from './Pattern.js';
export class Checker3DPattern extends Pattern {
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
        const x = Math.floor(patternPosition.x);
        const y = Math.floor(patternPosition.y);
        const z = Math.floor(patternPosition.z);
        return even(x + y + z) ?
            self.colorA.clone() : self.colorB.clone();
    }
}
//# sourceMappingURL=Checker3DPattern.js.map