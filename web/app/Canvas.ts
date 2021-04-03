import { SizeRequestContract } from '../contracts/RequestContract.js';
import { ResponseContract } from '../contracts/ResponseContract.js';

export class Canvas {
    public readonly canvas: HTMLCanvasElement;
    public readonly size: SizeRequestContract;

    private readonly _ctx: CanvasRenderingContext2D;

    constructor(private readonly _renderer: Worker) {
        this.size = { width: 512, height: 512 };
        this.canvas = this._createCanvas(this.size);

        this._ctx = this.canvas.getContext('2d')
        this._renderer.onmessage = this._onMessage;
    }

    public render(): void {
        this._renderer.postMessage({
            type: 'render',
            params: { size: this.size },
        });
    }

    private _createCanvas(size: SizeRequestContract): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-canvas';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }

    private _onMessage = (event: MessageEvent<ResponseContract>): void => {
        if (event.data.type !== 'pixelrow') { return; }

        const y = event.data.params.y;
        const buffer = event.data.params.buffer;
        const pixels = new Uint8ClampedArray(buffer);
        const imageData = new ImageData(pixels, pixels.length / 4);
        this._ctx.putImageData(imageData, 0, y);
    }
}
