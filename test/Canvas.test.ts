import { Color } from "../src/Color.js";
import { Canvas } from "../src/Canvas.js";

test('create canvas', () => {
    const canvas = new Canvas(2, 3);
    expect(canvas).toBeDefined();
    expect(canvas).toBeInstanceOf(Canvas);

    expect(canvas.width).toBe(2);
    expect(canvas.height).toBe(3);
});

test('created canvas initialized', () => {
    const canvas = new Canvas(3, 4);

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const pixel = canvas.getPixel(x, y);
            expect(pixel.r).toBe(0);
            expect(pixel.g).toBe(0);
            expect(pixel.b).toBe(0);
        }
    }
});

test('set canvas pixel color', () => {
    const canvas = new Canvas(10, 20);
    const red = new Color(1, 0, 0);
    const x = 4;
    const y = 8;
    canvas.setPixel(x, y, red);
    const pixel = canvas.getPixel(x, y);

    expect(pixel).toBeInstanceOf(Color);
    expect(pixel.r).toBe(1);
    expect(pixel.g).toBe(0);
    expect(pixel.b).toBe(0);
});

test('ppm header construction', () => {
    const canvas = new Canvas(10, 20);
    const ppm = canvas.toPpm();
    const lines = ppm.split('\n');

    expect(lines.length).toBeGreaterThan(3);
    expect(lines[0]).toBe('P3');
    expect(lines[1]).toBe('10 20');
    expect(lines[2]).toBe('255');
});

test('ppm ends with new line', () => {
    const canvas = new Canvas(18, 4);
    const ppm = canvas.toPpm();

    expect(ppm.slice(-1)).toBe('\n');
});

test('ppm lines never end with space', () => {
    const canvas = new Canvas(40, 7);
    const ppm = canvas.toPpm();
    const lines = ppm.split('\n');

    for (const line of lines) {
        expect(line.slice(-1)).not.toBe(' ');
    }
});

test('ppm splits lines after five pixels', () => {
    const canvas = new Canvas(9, 2);
    const color = new Color(1, 0.8, 0.6);
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            canvas.setPixel(x, y, color);
        }
    }

    const pixels = canvas.toPpm()
        .split('\n')
        .slice(3, 7)
        .join(`\n`);

    expect(pixels).toBe(
        `255 204 153 255 204 153 255 204 153 255 204 153 255 204 153
255 204 153 255 204 153 255 204 153 255 204 153
255 204 153 255 204 153 255 204 153 255 204 153 255 204 153
255 204 153 255 204 153 255 204 153 255 204 153`);
});
