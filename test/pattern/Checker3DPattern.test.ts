import { Point } from "../../src/math/Point.js";
import { Color } from "../../src/paint/Color.js";
import { Checker3DPattern } from "../../src/pattern/Checker3DPattern.js";

test('creates gradient pattern', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new Checker3DPattern(colorA, colorB);
    expect(pattern).toBeDefined();
    expect(pattern).toBeInstanceOf(Checker3DPattern);
    expect(pattern.colorA).toBe(colorA);
    expect(pattern.colorB).toBe(colorB);
});

test('returns a new instance', () => {
    const colorA = new Color(0, 0, 0);
    const colorB = new Color(1, 1, 1);
    const pattern = new Checker3DPattern(colorA, colorB);
    const patternColor = pattern.getColor(new Point(0, 0, 0));
    expect(patternColor).not.toBe(colorA);
    expect(patternColor).not.toBe(colorB);
});

test('should repeat in x', () => {
    const colorA = new Color(1, 1, 1);
    const colorB = new Color(0, 0, 0);
    const pattern = new Checker3DPattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0.99, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(1.01, 0, 0)).toArray())
        .toEqual([0, 0, 0]);
});

test('should repeat in y', () => {
    const colorA = new Color(1, 1, 1);
    const colorB = new Color(0, 0, 0);
    const pattern = new Checker3DPattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0, 0.99, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0, 1.01, 0)).toArray())
        .toEqual([0, 0, 0]);
});

test('should repeat in x', () => {
    const colorA = new Color(1, 1, 1);
    const colorB = new Color(0, 0, 0);
    const pattern = new Checker3DPattern(colorA, colorB);

    expect(pattern.getColor(new Point(0, 0, 0)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0, 0, 0.99)).toArray())
        .toEqual([1, 1, 1]);
    expect(pattern.getColor(new Point(0, 0, 1.01)).toArray())
        .toEqual([0, 0, 0]);
});
