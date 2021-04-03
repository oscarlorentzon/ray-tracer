export class EventEmitter {
    constructor() { this._events = {}; }
    on(type, handler) {
        this._events[type] = this._events[type] || [];
        this._events[type].push(handler);
    }
    off(type, handler) {
        if (!type) {
            this._events = {};
            return;
        }
        if (!this._listens(type)) {
            const index = this._events[type].indexOf(handler);
            if (index >= 0) {
                this._events[type].splice(index, 1);
            }
            if (this._events[type].length) {
                delete this._events[type];
            }
        }
        else {
            delete this._events[type];
        }
    }
    fire(type, event) {
        if (!this._listens(type)) {
            return;
        }
        for (const fn of this._events[type]) {
            fn.call(this, event);
        }
    }
    _listens(eventType) {
        return eventType in this._events;
    }
}
//# sourceMappingURL=EventEmitter.js.map