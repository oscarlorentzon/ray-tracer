import { equals } from './Common.js';

export class Matrix3 {
    public entries: Array<number>;
    constructor() {
        this.entries = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    }

    clone(): Matrix3 { return new Matrix3().fromArray(this.toArray()); }

    equals(m: Matrix3): boolean {
        const te = this.entries;
        const me = m.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            if (!equals(te[i], me[i])) { return false; };
        }
        return true;
    }

    fromArray(a: Array<number>): Matrix3 {
        const te = this.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            te[i] = a[i];
        }
        return this;
    }

    toArray(): Array<number> {
        const ae = [];
        const te = this.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            ae[i] = te[i];
        }
        return ae;
    }

    transpose(): Matrix3 {
        const te = this.entries;
        const t01 = te[1];
        const t02 = te[2];
        const t10 = te[3];
        const t12 = te[5];
        const t20 = te[6];
        const t21 = te[7];

        te[1] = t10;
        te[2] = t20;

        te[3] = t01;
        te[5] = t21;

        te[6] = t02;
        te[7] = t12;

        return this;
    }
}
