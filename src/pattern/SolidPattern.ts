import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class SolidPattern extends Pattern {
    constructor(public readonly color: Color) {
        super();
    }

    getColor(): Color {
        const self = this;
        return self.color.clone();
    }
}
