import { Point } from '../../src/math/Point.js';
import { Color } from '../../src/paint/Color.js';
import { StripePattern } from '../../src/pattern/StripePattern.js';

test('creates stripe pattern', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new StripePattern(colorA, colorB);
    expect(pattern).toBeDefined();
    expect(pattern).toBeInstanceOf(StripePattern);
    expect(pattern.colorA).toBe(colorA);
    expect(pattern.colorB).toBe(colorB);
});

test('returns a new instance', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new StripePattern(colorA, colorB);
    const patternColor = pattern.getColor(new Point(0, 0, 0));
    expect(patternColor).not.toBe(colorA);
    expect(patternColor).not.toBe(colorB);
});

test('is constant in y', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new StripePattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(0, 1, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(0, 2, 0)).toArray())
        .toEqual(colorA.toArray());
});

test('is constant in z', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new StripePattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(0, 0, 1)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(0, 0, 2)).toArray())
        .toEqual(colorA.toArray());
});

test('alternates in x', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new StripePattern(colorA, colorB);

    expect(pattern.getColor(new Point(-1.1, 0, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(-1, 0, 0)).toArray())
        .toEqual(colorB.toArray());
    expect(pattern.getColor(new Point(-0.1, 0, 0)).toArray())
        .toEqual(colorB.toArray());
    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(0.9, 0, 0)).toArray())
        .toEqual(colorA.toArray());
    expect(pattern.getColor(new Point(1, 0, 0)).toArray())
        .toEqual(colorB.toArray());
    expect(pattern.getColor(new Point(1.1, 0, 0)).toArray())
        .toEqual(colorB.toArray());
    expect(pattern.getColor(new Point(2, 0, 0)).toArray())
        .toEqual(colorA.toArray());
});
