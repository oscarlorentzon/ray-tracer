import { Pattern } from './Pattern.js';
export class SolidPattern extends Pattern {
    constructor(color) {
        super();
        this.color = color;
    }
    getColor() {
        const self = this;
        return self.color.clone();
    }
}
//# sourceMappingURL=SolidPattern.js.map