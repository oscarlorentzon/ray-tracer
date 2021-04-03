import { clamp } from '../math/Common.js';
import { Color } from './Color.js';
export class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        const length = 3 * width * height;
        // Row-major, (0, 0) coordinate in top left corner
        this._canvas = new Float32Array(length);
    }
    clear() {
        this._canvas = new Float32Array(this._canvas.length);
    }
    getPixel(x, y) {
        const self = this;
        const canvas = self._canvas;
        let i = self._getIndex(x, y);
        return new Color(canvas[i], canvas[++i], canvas[++i]);
    }
    paintPixel(x, y, c) {
        const self = this;
        const canvas = self._canvas;
        let i = self._getIndex(x, y);
        canvas[i] = clamp(c.r, 0, 1);
        canvas[++i] = clamp(c.g, 0, 1);
        canvas[++i] = clamp(c.b, 0, 1);
        return self;
    }
    toPpm() {
        const self = this;
        const w = self.width;
        const h = self.height;
        let ppm = `P3\n${w} ${h}\n255\n`;
        const canvas = self._canvas;
        let i = 0;
        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                if (x !== 0 && x % 5 === 0) {
                    ppm += '\n';
                }
                const r = Math.round(255 * canvas[i++]);
                const g = Math.round(255 * canvas[i++]);
                const b = Math.round(255 * canvas[i++]);
                ppm += `${r} ${g} ${b}`;
                if (x !== w - 1 && (x + 1) % 5 !== 0) {
                    ppm += ' ';
                }
            }
            ppm += '\n';
        }
        return ppm;
    }
    _getIndex(x, y) {
        const self = this;
        const w = self.width;
        return 3 * (w * y + x);
    }
}
//# sourceMappingURL=Canvas.js.map