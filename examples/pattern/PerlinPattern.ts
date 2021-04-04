import {
    Color,
    Pattern,
    Point,
} from '../../src/ray-tracer.js';
import { perlin } from '../util/Noise.js';

export class PerlinPattern extends Pattern {
    constructor(
        public readonly pattern: Pattern) {
        super();
    }

    getColor(objectPosition: Point): Color {
        const self = this;
        const patternPosition = objectPosition
            .clone()
            .mulMatrix4(self.pattern.patternToObjectInverse);
        const x = patternPosition.x;
        const z = patternPosition.z;
        const noise = 0.5 * perlin(x, z);
        patternPosition.x += noise;
        patternPosition.z += noise;
        const perturbedObjectPosition = patternPosition
            .mulMatrix4(self.pattern.patternToObject);
        return self.pattern.getColor(perturbedObjectPosition);
    }

    setPatternToObject(): Pattern {
        throw new Error('Not supported');
    }
}
