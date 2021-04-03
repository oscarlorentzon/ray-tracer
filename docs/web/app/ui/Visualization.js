export class Visualization {
    constructor(size) {
        this.size = size;
        this.size = { width: 512, height: 512 };
        this.canvas = this._createCanvas(this.size);
        this._ctx = this.canvas.getContext('2d');
    }
    renderRow(y, buffer) {
        const pixels = new Uint8ClampedArray(buffer);
        const imageData = new ImageData(pixels, pixels.length / 4);
        this._ctx.putImageData(imageData, 0, y);
    }
    _createCanvas(size) {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-viz';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }
}
//# sourceMappingURL=Visualization.js.map