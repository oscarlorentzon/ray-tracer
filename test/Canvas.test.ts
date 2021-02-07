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
    canvas.setPixel(red, x, y);
    const pixel = canvas.getPixel(x, y);

    expect(pixel).toBeInstanceOf(Color);
    expect(pixel.r).toBe(1);
    expect(pixel.g).toBe(0);
    expect(pixel.b).toBe(0);
});
