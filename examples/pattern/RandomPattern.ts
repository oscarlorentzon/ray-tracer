import {
    Color,
    Pattern,
    Point,
} from '../../src/ray-tracer.js';

export class RandomPattern extends Pattern {
    constructor(
        public readonly pattern: Pattern) {
        super();
    }

    getColor(objectPosition: Point): Color {
        const t = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(t.pattern.patternToObjectInverse);
        const noise = 0.5 * Math.random();
        patternPosition.x += noise;
        patternPosition.z += noise;
        const perturbedObjectPosition = patternPosition
            .mulMatrix4(t.pattern.patternToObject);
        return t.pattern.getColor(perturbedObjectPosition);
    }

    setPatternToObject(): Pattern {
        throw new Error('Not supported');
    }
}
