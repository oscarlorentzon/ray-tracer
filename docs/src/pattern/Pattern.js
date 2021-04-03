import { Matrix4 } from '../math/Matrix4.js';
export class Pattern {
    constructor() {
        this.patternToObject = new Matrix4();
        this.patternToObjectInverse = new Matrix4();
    }
    setPatternToObject(m) {
        const self = this;
        const a = m
            .toArray();
        self.patternToObject
            .fromArray(a);
        self.patternToObjectInverse
            .fromArray(a)
            .invert();
        return self;
    }
}
//# sourceMappingURL=Pattern.js.map