import { Pattern } from './Pattern.js';
export class BlendPattern extends Pattern {
    constructor(patternA, patternB, blend) {
        super();
        this.patternA = patternA;
        this.patternB = patternB;
        this.blend = blend;
    }
    getColor(objectPosition) {
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
//# sourceMappingURL=BlendPattern.js.map