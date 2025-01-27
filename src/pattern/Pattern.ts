import { Matrix4 } from '../math/Matrix4.js';
import { Point } from '../math/Point.js';
import { Color } from '../paint/Color.js';

export abstract class Pattern {
    public readonly patternToObject: Matrix4;
    public readonly patternToObjectInverse: Matrix4;

    constructor() {
        this.patternToObject = new Matrix4();
        this.patternToObjectInverse = new Matrix4();
    }

    abstract getColor(objectPosition: Point): Color;

    setPatternToObject(m: Matrix4): Pattern {
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
