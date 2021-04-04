import { SizeRequestContract } from "../../contracts/RequestContract";

export class Sandbox {
    public readonly canvas: HTMLCanvasElement;
    constructor(private _size: SizeRequestContract) {
        this.canvas = this._createCanvas(this._size);
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
