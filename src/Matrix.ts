import { equals } from "./Common.js";

export class Matrix {
    public entries: Array<number>;
    constructor() {
        this.entries = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }

    equals(m: Matrix): boolean {
        const te = this.entries;
        const me = m.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            if (!equals(te[i], me[i])) { return false; };
        }
        return true;
    }

    fromArray(a: Array<number>): Matrix {
        const te = this.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            te[i] = a[i];
        }
        return this;
    }

    /**
     * Multiplies this matrix with another matrix (Other * This).
     * @param {Matrix} m Other matrix.
     * @returns {Matrix} This matrix.
     */
    mul(m: Matrix): Matrix {
        const te = this.entries;
        const t00 = te[0];
        const t01 = te[1];
        const t02 = te[2];
        const t03 = te[3];
        const t10 = te[4];
        const t11 = te[5];
        const t12 = te[6];
        const t13 = te[7];
        const t20 = te[8];
        const t21 = te[9];
        const t22 = te[10];
        const t23 = te[11];
        const t30 = te[12];
        const t31 = te[13];
        const t32 = te[14];
        const t33 = te[15];

        const me = m.entries;
        const m00 = me[0];
        const m01 = me[1];
        const m02 = me[2];
        const m03 = me[3];
        const m10 = me[4];
        const m11 = me[5];
        const m12 = me[6];
        const m13 = me[7];
        const m20 = me[8];
        const m21 = me[9];
        const m22 = me[10];
        const m23 = me[11];
        const m30 = me[12];
        const m31 = me[13];
        const m32 = me[14];
        const m33 = me[15];

        te[0] = m00 * t00 + m01 * t10 + m02 * t20 + m03 * t30;
        te[1] = m00 * t01 + m01 * t11 + m02 * t21 + m03 * t31;
        te[2] = m00 * t02 + m01 * t12 + m02 * t22 + m03 * t32;
        te[3] = m00 * t03 + m01 * t13 + m02 * t23 + m03 * t33;

        te[4] = m10 * t00 + m11 * t10 + m12 * t20 + m13 * t30;
        te[5] = m10 * t01 + m11 * t11 + m12 * t21 + m13 * t31;
        te[6] = m10 * t02 + m11 * t12 + m12 * t22 + m13 * t32;
        te[7] = m10 * t03 + m11 * t13 + m12 * t23 + m13 * t33;

        te[8] = m20 * t00 + m21 * t10 + m22 * t20 + m23 * t30;
        te[9] = m20 * t01 + m21 * t11 + m22 * t21 + m23 * t31;
        te[10] = m20 * t02 + m21 * t12 + m22 * t22 + m23 * t32;
        te[11] = m20 * t03 + m21 * t13 + m22 * t23 + m23 * t33;

        te[12] = m30 * t00 + m31 * t10 + m32 * t20 + m33 * t30;
        te[13] = m30 * t01 + m31 * t11 + m32 * t21 + m33 * t31;
        te[14] = m30 * t02 + m31 * t12 + m32 * t22 + m33 * t32;
        te[15] = m30 * t03 + m31 * t13 + m32 * t23 + m33 * t33;

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

    transpose(): Matrix {
        const te = this.entries;
        const t01 = te[1];
        const t02 = te[2];
        const t03 = te[3];
        const t10 = te[4];
        const t12 = te[6];
        const t13 = te[7];
        const t20 = te[8];
        const t21 = te[9];
        const t23 = te[11];
        const t30 = te[12];
        const t31 = te[13];
        const t32 = te[14];

        te[1] = t10;
        te[2] = t20;
        te[3] = t30;

        te[4] = t01;
        te[6] = t21;
        te[7] = t31;

        te[8] = t02;
        te[9] = t12;
        te[11] = t32;

        te[12] = t03;
        te[13] = t13;
        te[14] = t23;

        return this;
    }
}
