import { Color } from "./Color.js";

export class Canvas {
    private _canvas: Float32Array;
    constructor(
        public readonly width: number,
        public readonly height: number) {
        const length = 3 * width * height;
        // Row-major, (0, 0) coordinate in top left corner
        this._canvas = new Float32Array(length);
    }

    clear(): void {
        this._canvas = new Float32Array(this._canvas.length);
    }

    getPixel(x: number, y: number): Color {
        const t = this;
        const canvas = t._canvas;
        let i = t._getIndex(x, y);
        return new Color(canvas[i], canvas[++i], canvas[++i]);
    }

    paintPixel(x: number, y: number, c: Color): Canvas {
        const t = this;
        const canvas = t._canvas;
        let i = t._getIndex(x, y);
        canvas[i] = c.r;
        canvas[++i] = c.g;
        canvas[++i] = c.b;
        return t;
    }

    toPpm(): string {
        const t = this;
        const w = t.width;
        const h = t.height;
        let ppm = `P3\n${w} ${h}\n255\n`;
        const canvas = t._canvas;
        let i = 0;
        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                if (x !== 0 && x % 5 === 0) { ppm += '\n'; }
                const r = Math.round(255 * canvas[i++]);
                const g = Math.round(255 * canvas[i++]);
                const b = Math.round(255 * canvas[i++]);
                ppm += `${r} ${g} ${b}`;
                if (x !== w - 1 && (x + 1) % 5 !== 0) { ppm += ' '; }
            }
            ppm += '\n';
        }
        return ppm;
    }

    private _getIndex(x: number, y: number): number {
        const t = this;
        const w = t.width;
        return 3 * (w * y + x);
    }
}
