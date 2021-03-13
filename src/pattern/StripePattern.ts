import { Point } from "../math/Point.js";
import { Color } from "../paint/Color.js";
import { Pattern } from "./Pattern.js";

export class StripePattern extends Pattern {
    constructor(
        public readonly colorA: Color,
        public readonly colorB: Color) {
        super();
    }

    getColor(point: Point): Color {
        const t = this;
        return Math.floor(point.x) % 2 === 0 ?
            t.colorA : t.colorB;
    }
}
