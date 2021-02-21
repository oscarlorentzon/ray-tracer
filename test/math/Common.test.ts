import { EPSILON, equals } from "../../src/math/Common.js";

test('equals when same number', () => {
    expect(equals(-1, -1)).toBe(true);
    expect(equals(0, 0)).toBe(true);
    expect(equals(1, 1)).toBe(true);
    expect(equals(1000, 1000)).toBe(true);
});

test('equals absolute when smaller than one', () => {
    expect(equals(0, EPSILON * 9e-1)).toBe(true);
    expect(equals(0, -EPSILON * 9e-1)).toBe(true);

    expect(equals(0.99, 0.99 + EPSILON * 9e-1)).toBe(true);
    expect(equals(-0.99, -0.99 - EPSILON * 9e-1)).toBe(true);
});

test('equals absolute when smaller than one', () => {
    expect(equals(EPSILON, EPSILON * 1e-5)).toBe(true);
});

test('equals relative when larger than one', () => {
    expect(equals(1e3, 1e3 + EPSILON * 9e2)).toBe(true);
    expect(equals(1e3, 1e3 - EPSILON * 9e2)).toBe(true);

    expect(equals(1e7, 1e7 - EPSILON * 9e6)).toBe(true);
    expect(equals(1e7, 1e7 - EPSILON * 9e6)).toBe(true);
});

test('equals for absolute', () => {
    expect(equals(0, EPSILON * 1.1)).toBe(false);
    expect(equals(0, -EPSILON * 1.1)).toBe(false);

    expect(equals(0.99, 0.99 + EPSILON * 1.1)).toBe(false);
    expect(equals(-0.99, -0.99 - EPSILON * 1.1)).toBe(false);
});

test('equals for relative', () => {
    expect(equals(1e3, 1e3 + EPSILON * 1.1e3)).toBe(false);
    expect(equals(1e3, 1e3 - EPSILON * 1.1e3)).toBe(false);

    expect(equals(1e7, 1e7 - EPSILON * 1.1e7)).toBe(false);
    expect(equals(1e7, 1e7 - EPSILON * 1.1e7)).toBe(false);
});
