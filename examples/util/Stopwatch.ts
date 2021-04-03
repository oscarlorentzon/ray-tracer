type Lap = {
    name: string;
    start: bigint;
    stop?: bigint;
}

export async function measureTime<T>(
    promiseGenerator: () => Promise<T>,
    name: string,
    stopwatch: Stopwatch): Promise<T> {
    stopwatch.start(name);
    const result = await promiseGenerator();
    stopwatch.stop(name);
    return result;
}

export class Stopwatch {
    private _laps: { [name: string]: Lap };
    constructor(
        private _width: number,
        private _height: number) {
        this._laps = {};
    }

    start(name: string): void {
        if (name in this._laps) {
            throw new Error(`Already started ${name}`);
        }
        const start = process.hrtime.bigint();
        this._laps[name] = { name, start };
    }

    stop(name: string): void {
        if (!(name in this._laps)) {
            throw new Error(`Not started ${name}`);
        }
        if (!!this._laps[name].stop) {
            throw new Error(`Already stopped ${name}`);
        }
        const stop = process.hrtime.bigint();
        this._laps[name].stop = stop;
    }

    log(): void {
        const toS = 1e-9;
        const w = this._width;
        const h = this._height;
        const mps = 1e-6 * w * h;
        console.log(`Size: ${w} x ${h} px`);
        for (const lap of Object.values(this._laps)) {
            const elapsed = toS * Number(lap.stop - lap.start);
            const perS = (mps / elapsed).toFixed(3);
            const s = elapsed.toFixed(3);
            console.log(`${lap.name}: ${s} s (${perS} mp / s)`);
        }
    }
}
