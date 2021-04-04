import { SizeRequestContract } from "../contracts/RequestContract";

export class Sandbox {
    private readonly _canvas: HTMLCanvasElement;
    constructor(private _size: SizeRequestContract) {
        this._canvas = this._createCanvas(this._size);
    }

    private _createCanvas(size: SizeRequestContract): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-sandbox';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }
}
