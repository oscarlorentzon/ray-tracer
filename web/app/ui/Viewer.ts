import { SizeContract } from '../../contracts/Contract.js';
import { RequestContract } from '../../contracts/RequestContract.js';
import { ResponseContract } from '../../contracts/ResponseContract.js';
import { AppEvent } from '../events/AppEvent.js';
import { EventType } from '../events/EventType.js';
import { createCompatibility } from '../support/compatibility.js';
import { Sandbox } from './Sandbox.js';
import { Visualization } from './Visualization.js';

export class Viewer {
    private readonly _sandbox: Sandbox;
    private readonly _viz: Visualization;

    constructor(
        private readonly _renderer: Worker) {
        const size: SizeContract = { height: 512, width: 512 };
        this._sandbox = new Sandbox(size);
        this._viz = new Visualization(size);
    }

    public init(): void {
        this._renderer.onerror = this._onError;
        this._renderer.onmessage = this._onMessage;

        document.body.appendChild(this._sandbox.canvas);
        document.body.appendChild(this._viz.canvas);

        this._sandbox.on(<EventType>'objectadd', this._objects);

        this._render();
    }

    private readonly _onError = (event: ErrorEvent): void => {
        console.error(event.message);
        document.body.removeChild(this._sandbox.canvas);
        document.body.removeChild(this._viz.canvas);

        const compatibility = createCompatibility();
        document.body.appendChild(compatibility);
    };

    private _objects = (event: AppEvent<Sandbox>): void => {
        const request: RequestContract = {
            type: 'objects',
            params: { objects: { objects: event.target.objects } },
        };
        this._renderer.postMessage(request);
        this._render();
    }

    private _render(): void {
        const request: RequestContract = {
            type: 'render',
            params: { size: this._viz.size },
        };
        this._renderer.postMessage(request);
    }

    private _onMessage = (event: MessageEvent<ResponseContract>): void => {
        if (event.data.type !== 'pixelrow') { return; }

        const y = event.data.params.pixelRow.y;
        const buffer = event.data.params.pixelRow.buffer;
        this._viz.renderRow(y, buffer);
    }
}
