import { EPSILON } from '../../src/math/Common.js';
import { Point } from '../../src/math/Point.js';
import { Color } from '../../src/paint/Color.js';
import { RingPattern } from '../../src/pattern/RingPattern.js';

test('creates gradient pattern', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new RingPattern(colorA, colorB);
    expect(pattern).toBeDefined();
    expect(pattern).toBeInstanceOf(RingPattern);
    expect(pattern.colorA).toBe(colorA);
    expect(pattern.colorB).toBe(colorB);
});

test('returns a new instance', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new RingPattern(colorA, colorB);
    const patternColor = pattern.getColor(new Point(0, 0, 0));
    expect(patternColor).not.toBe(colorA);
    expect(patternColor).not.toBe(colorB);
});

test('extends in x and z', () => {
    const colorA = new Color(1, 1, 1);
    const colorB = new Color(0, 0, 0);
    const pattern = new RingPattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(1, 0, 0)).toArray())
        .toEqual([0, 0, 0]);
    expect(pattern.getColor(new Point(0, 0, 1)).toArray())
        .toEqual([0, 0, 0]);
    expect(
        pattern.getColor(
            new Point(
                1 / Math.sqrt(2) + EPSILON,
                0,
                1 / Math.sqrt(2) + EPSILON))
            .toArray())
        .toEqual([0, 0, 0]);
    expect(
        pattern.getColor(
            new Point(
                Math.sqrt(2) + EPSILON,
                0,
                Math.sqrt(2) + EPSILON))
            .toArray())
        .toEqual([1, 1, 1]);
});
