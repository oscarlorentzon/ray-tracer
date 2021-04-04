import { SizeContract } from '../../contracts/Contract.js';

export class Visualization {
    public readonly canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;

    constructor(public readonly size: SizeContract) {
        this.size = { width: 512, height: 512 };
        this.canvas = this._createCanvas(this.size);
        this._ctx = this.canvas.getContext('2d');
    }

    public renderRow(y: number, buffer: ArrayBuffer): void {
        const pixels = new Uint8ClampedArray(buffer);
        const imageData = new ImageData(pixels, pixels.length / 4);
        this._ctx.putImageData(imageData, 0, y);
    }

    private _createCanvas(size: SizeContract): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-viz';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }
}
