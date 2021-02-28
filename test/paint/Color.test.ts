import { Color } from '../../src/paint/Color.js';

test('creates color', () => {
    const color = new Color(0, 0, 0);
    expect(color).toBeDefined();
    expect(color).toBeInstanceOf(Color);
});

test('sets the channels', () => {
    const color = new Color(0.2, 0.4, 0.6);
    expect(color.r).toBe(0.2);
    expect(color.g).toBe(0.4);
    expect(color.b).toBe(0.6);
});

test('add a color to add each channel', () => {
    const color1 = new Color(0.9, 0.6, 0.75);
    const color2 = new Color(0.7, 0.1, 0.25);

    const sum = color1.add(color2);

    expect(sum).toBe(color1);
    expect(sum).toBeInstanceOf(Color);

    expect(sum.r).toBe(1.6);
    expect(sum.g).toBe(0.7);
    expect(sum.b).toBe(1);

    expect(color1.r).toBe(1.6);
    expect(color1.g).toBe(0.7);
    expect(color1.b).toBe(1);

    expect(color2.r).toBe(0.7);
    expect(color2.g).toBe(0.1);
    expect(color2.b).toBe(0.25);
});

test('chaining add', () => {
    const color = new Color(0.1, 0.2, 0.3);

    const sum = color
        .add(new Color(0.1, 0.2, 0.3))
        .add(new Color(0.1, 0.2, 0.3));

    expect(sum).toBe(color);

    expect(sum.r).toBeCloseTo(0.3);
    expect(sum.g).toBeCloseTo(0.6);
    expect(sum.b).toBeCloseTo(0.9);
});

test('subtract a color to subtract each channel', () => {
    const color1 = new Color(0.9, 0.6, 0.75);
    const color2 = new Color(0.7, 0.1, 0.25);

    const diff = color1.sub(color2);

    expect(diff).toBe(color1);
    expect(diff).toBeInstanceOf(Color);

    expect(diff.r).toBeCloseTo(0.2);
    expect(diff.g).toBeCloseTo(0.5);
    expect(diff.b).toBeCloseTo(0.5);

    expect(color1.r).toBeCloseTo(0.2);
    expect(color1.g).toBeCloseTo(0.5);
    expect(color1.b).toBeCloseTo(0.5);

    expect(color2.r).toBe(0.7);
    expect(color2.g).toBe(0.1);
    expect(color2.b).toBe(0.25);
});

test('multiply a color by a scalar', () => {
    const color = new Color(0.2, 0.3, 0.4);
    const product = color.mulScalar(2);

    expect(product).toBe(color);
    expect(product).toBeInstanceOf(Color);

    expect(product.r).toBe(0.4);
    expect(product.g).toBe(0.6);
    expect(product.b).toBe(0.8);

    expect(color.r).toBe(0.4);
    expect(color.g).toBe(0.6);
    expect(color.b).toBe(0.8);
});

test('cloning a color', () => {
    const color = new Color(0.2, 0.9, 0.1);
    const clone = color.clone();

    expect(clone).not.toBe(color);
    expect(clone).toBeInstanceOf(Color);

    expect(clone.r).toBe(0.2);
    expect(clone.g).toBe(0.9);
    expect(clone.b).toBe(0.1);
});

test('schur product for a color', () => {
    const color1 = new Color(1, 0.2, 0.4);
    const color2 = new Color(0.9, 1, 0.1);

    const schur12 = color1.clone().schur(color2);

    expect(schur12).toBeInstanceOf(Color);

    expect(schur12.r).toBe(0.9);
    expect(schur12.g).toBe(0.2);
    expect(schur12.b).toBeCloseTo(0.04);

    expect(color2.r).toBe(0.9);
    expect(color2.g).toBe(1);
    expect(color2.b).toBe(0.1);

    const schur21 = color2.clone().schur(color1);

    expect(schur21).toBeInstanceOf(Color);

    expect(schur21.r).toBe(0.9);
    expect(schur21.g).toBe(0.2);
    expect(schur21.b).toBeCloseTo(0.04);

    expect(color1.r).toBe(1);
    expect(color1.g).toBe(0.2);
    expect(color1.b).toBe(0.4);
});
