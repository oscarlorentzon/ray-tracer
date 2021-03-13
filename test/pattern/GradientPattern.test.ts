import { Point } from "../../src/math/Point.js";
import { Color } from "../../src/paint/Color.js";
import { GradientPattern } from "../../src/pattern/GradientPattern.js";

test('creates gradient pattern', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new GradientPattern(colorA, colorB);
    expect(pattern).toBeDefined();
    expect(pattern).toBeInstanceOf(GradientPattern);
    expect(pattern.colorA).toBe(colorA);
    expect(pattern.colorB).toBe(colorB);
});

test('returns a new instance', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new GradientPattern(colorA, colorB);
    const patternColor = pattern.getColor(new Point(0, 0, 0));
    expect(patternColor).not.toBe(colorA);
    expect(patternColor).not.toBe(colorB);
});

test('linearly interpolates between colors', () => {
    const colorA = new Color(1, 1, 1);
    const colorB = new Color(0, 0, 0);
    const pattern = new GradientPattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0.25, 0, 0)).toArray())
        .toEqual([0.75, 0.75, 0.75]);
    expect(pattern.getColor(new Point(0.5, 0, 0)).toArray())
        .toEqual([0.5, 0.5, 0.5]);
    expect(pattern.getColor(new Point(0.75, 0, 0)).toArray())
        .toEqual([0.25, 0.25, 0.25]);
    expect(pattern.getColor(new Point(1, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
});
