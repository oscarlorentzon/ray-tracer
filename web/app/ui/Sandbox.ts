import { SizeRequestContract } from '../../contracts/RequestContract.js';
import { containerPosition } from '../util/DOM.js';

export class Sandbox {
    public readonly canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;

    constructor(private _size: SizeRequestContract) {
        this.canvas = this._createCanvas(this._size);
        this._ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', this._onClick);
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

    private readonly _onClick = (event: MouseEvent): void => {
        const [x, y] = containerPosition(event, this.canvas);
        const ctx = this._ctx;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.ellipse(x, y, 4, 4, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}
