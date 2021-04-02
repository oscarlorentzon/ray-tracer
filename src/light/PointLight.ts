import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';

export class PointLight {
    constructor(
        public readonly position: Point,
        public readonly intensity: Color) { }
}
