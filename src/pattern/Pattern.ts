import { Point } from "../math/Point.js";
import { Color } from "../paint/Color.js";

export abstract class Pattern {
    abstract getColor(point: Point): Color;
}
