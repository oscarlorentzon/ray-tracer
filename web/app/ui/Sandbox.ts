import {
    ROOM_DEPTH,
    ROOM_WIDTH,
} from '../../contracts/Contants.js';
import {
    ObjectContract,
    SizeContract,
} from '../../contracts/Contract.js';
import { EventType } from '../events/EventType.js';
import { containerPosition } from '../util/DOM.js';
import { EventEmitter } from '../util/EventEmitter.js';

export class Sandbox extends EventEmitter {
    public readonly canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;
    public readonly objects: Array<ObjectContract>;

    constructor(private _size: SizeContract) {
        super();
        this.canvas = this._createCanvas(this._size);
        this._ctx = this.canvas.getContext('2d');
        this.objects = [];

        this.canvas.addEventListener('click', this._onClick);
    }

    private _createCanvas(size: SizeContract): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-sandbox';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }

    private readonly _onClick = (event: MouseEvent): void => {
        const clientRect = this.canvas.getBoundingClientRect();
        const containerWidth = clientRect.width;
        const containerHeight = clientRect.height;
        const [containerX, containerY] =
            containerPosition(event, this.canvas);
        const ctx = this._ctx;
        const radiusX = containerWidth / ROOM_WIDTH;
        const radiusY = containerHeight / ROOM_DEPTH;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(
            containerX,
            containerY,
            radiusX,
            radiusY,
            0,
            0,
            2 * Math.PI);
        ctx.stroke();

        const x = ROOM_WIDTH * containerX / containerWidth;
        const y = ROOM_DEPTH * containerY / containerHeight;
        const object: ObjectContract = {
            instance: { position: { x, y } },
            type: 'sphere',
        };
        this.objects.push(object);
        this.fire(<EventType>'objectadd', { target: this });
    }
}
