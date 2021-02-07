import { Color } from "./Color.js";

export class Canvas {
    private _canvas: Float32Array;
    constructor(
        public readonly width: number,
        public readonly height: number) {
        const length = 3 * width * height;
        // (0, 0) coordinate in top left corner
        this._canvas = new Float32Array(length);
    }

    getPixel(x: number, y: number): Color {
        const t = this;
        const canvas = t._canvas;
        let i = t._getIndex(x, y);
        return new Color(canvas[i], canvas[++i], canvas[++i]);
    }

    setPixel(c: Color, x: number, y: number): Canvas {
        const t = this;
        const canvas = t._canvas;
        let i = t._getIndex(x, y);
        canvas[i] = c.r;
        canvas[++i] = c.g;
        canvas[++i] = c.b;
        return t;
    }

    private _getIndex(x: number, y: number): number {
        const t = this;
        const w = t.width;
        // Row-major
        return 3 * (w * y + x);
    }
}
