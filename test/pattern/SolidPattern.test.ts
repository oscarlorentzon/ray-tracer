import { Color } from '../../src/paint/Color.js';
import { SolidPattern } from '../../src/pattern/SolidPattern.js';

test('creates solid pattern', () => {
    const color = new Color(0, 0, 0);
    const pattern = new SolidPattern(color);
    expect(pattern).toBeDefined();
    expect(pattern).toBeInstanceOf(SolidPattern);
    expect(pattern.color).toBe(color);
});

test('returns a new instance', () => {
    const color = new Color(0, 0, 0);
    const pattern = new SolidPattern(color);
    const patternColor = pattern.getColor();
    expect(patternColor).not.toBe(color);
});

test('always returns color', () => {
    const color = new Color(0.2, 0.4, 0.6);
    const pattern = new SolidPattern(color);

    expect(pattern.getColor().toArray())
        .toEqual(color.toArray());
});
