export class EventEmitter {
    private _events: { [type: string]: ((event: unknown) => void)[] };

    constructor() { this._events = {}; }

    public on<T>(
        type: string,
        handler: (event: T) => void): void {
        this._events[type] = this._events[type] || [];
        this._events[type].push(handler);
    }

    public off<T>(
        type: string,
        handler: (event: T) => void): void {
        if (!type) { this._events = {}; return; }

        if (!this._listens(type)) {
            const index = this._events[type].indexOf(handler);
            if (index >= 0) {
                this._events[type].splice(index, 1);
            }
            if (this._events[type].length) {
                delete this._events[type];
            }
        } else {
            delete this._events[type];
        }
    }

    public fire<T>(
        type: string,
        event: T): void {
        if (!this._listens(type)) { return; }
        for (const fn of this._events[type]) {
            fn.call(this, event);
        }
    }

    private _listens(eventType: string): boolean {
        return eventType in this._events;
    }
}
