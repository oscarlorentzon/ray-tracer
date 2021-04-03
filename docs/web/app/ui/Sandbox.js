import { ROOM_DEPTH, ROOM_WIDTH, } from '../../contracts/Contants.js';
import { containerPosition } from '../util/DOM.js';
import { EventEmitter } from '../util/EventEmitter.js';
export class Sandbox extends EventEmitter {
    constructor(_size) {
        super();
        this._size = _size;
        this._onClick = (event) => {
            const clientRect = this.canvas.getBoundingClientRect();
            const containerWidth = clientRect.width;
            const containerHeight = clientRect.height;
            const [containerX, containerY] = containerPosition(event, this.canvas);
            const ctx = this._ctx;
            const radiusX = containerWidth / ROOM_WIDTH;
            const radiusY = containerHeight / ROOM_DEPTH;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.ellipse(containerX, containerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.stroke();
            const x = ROOM_WIDTH * containerX / containerWidth;
            const y = ROOM_DEPTH * containerY / containerHeight;
            const object = {
                instance: { position: { x, y } },
                type: 'sphere',
            };
            this.objects.push(object);
            this.fire('objectadd', { target: this });
        };
        this.canvas = this._createCanvas(this._size);
        this._ctx = this.canvas.getContext('2d');
        this.objects = [];
        this.canvas.addEventListener('click', this._onClick);
    }
    _createCanvas(size) {
        const canvas = document.createElement('canvas');
        canvas.className = 'ray-tracer-sandbox';
        canvas.style.height = `${size.height}px`;
        canvas.style.width = `${size.width}px`;
        canvas.width = size.height;
        canvas.height = size.width;
        return canvas;
    }
}
//# sourceMappingURL=Sandbox.js.map