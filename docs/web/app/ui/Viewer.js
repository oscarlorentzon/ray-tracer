import { createCompatibility } from '../support/compatibility.js';
import { Sandbox } from './Sandbox.js';
import { Visualization } from './Visualization.js';
export class Viewer {
    constructor(_renderer) {
        this._renderer = _renderer;
        this._onError = (event) => {
            console.error(event.message);
            document.body.removeChild(this._sandbox.canvas);
            document.body.removeChild(this._viz.canvas);
            const compatibility = createCompatibility();
            document.body.appendChild(compatibility);
        };
        this._objects = (event) => {
            const request = {
                type: 'objects',
                params: { objects: { objects: event.target.objects } },
            };
            this._renderer.postMessage(request);
            this._render();
        };
        this._onMessage = (event) => {
            if (event.data.type !== 'pixelrow') {
                return;
            }
            const y = event.data.params.pixelRow.y;
            const buffer = event.data.params.pixelRow.buffer;
            this._viz.renderRow(y, buffer);
        };
        const size = { height: 512, width: 512 };
        this._sandbox = new Sandbox(size);
        this._viz = new Visualization(size);
    }
    init() {
        this._renderer.onerror = this._onError;
        this._renderer.onmessage = this._onMessage;
        document.body.appendChild(this._sandbox.canvas);
        document.body.appendChild(this._viz.canvas);
        this._sandbox.on('objectadd', this._objects);
        this._render();
    }
    _render() {
        const request = {
            type: 'render',
            params: { size: this._viz.size },
        };
        this._renderer.postMessage(request);
    }
}
//# sourceMappingURL=Viewer.js.map