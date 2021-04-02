import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';
import { Pattern } from './Pattern.js';

export class SolidPattern extends Pattern {
    constructor(public readonly color: Color) {
        super();
    }

    getColor(_: Point): Color {
        const t = this;
        return t.color.clone();
    }
}
