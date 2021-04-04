import { equals } from './Common.js';
import { Matrix3 } from './Matrix3.js';

export class Matrix4 {
    public entries: Array<number>;
    constructor() {
        this.entries = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }

    clone(): Matrix4 { return new Matrix4().fromArray(this.toArray()); }

    determinant(): number {
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

        const self = this;
        const d00 = self._det3(t11, t12, t13, t21, t22, t23, t31, t32, t33);
        const d01 = self._det3(t10, t12, t13, t20, t22, t23, t30, t32, t33);
        const d02 = self._det3(t10, t11, t13, t20, t21, t23, t30, t31, t33);
        const d03 = self._det3(t10, t11, t12, t20, t21, t22, t30, t31, t32);

        return t00 * d00 - t01 * d01 + t02 * d02 - t03 * d03;
    }

    equals(m: Matrix4): boolean {
        const te = this.entries;
        const me = m.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            if (!equals(te[i], me[i])) { return false; }
        }
        return true;
    }

    fromArray(a: Array<number>): Matrix4 {
        const te = this.entries;
        const length = te.length;
        for (let i = 0; i < length; ++i) {
            te[i] = a[i];
        }
        return this;
    }

    fromRotationX(r: number): Matrix4 {
        const te = this.entries;
        const cosr = Math.cos(r);
        const sinr = Math.sin(r);
        te[0] = 1;
        te[1] = 0;
        te[2] = 0;
        te[3] = 0;
        te[4] = 0;
        te[5] = cosr;
        te[6] = -sinr;
        te[7] = 0;
        te[8] = 0;
        te[9] = sinr;
        te[10] = cosr;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    fromRotationY(r: number): Matrix4 {
        const te = this.entries;
        const cosr = Math.cos(r);
        const sinr = Math.sin(r);
        te[0] = cosr;
        te[1] = 0;
        te[2] = sinr;
        te[3] = 0;
        te[4] = 0;
        te[5] = 1;
        te[6] = 0;
        te[7] = 0;
        te[8] = -sinr;
        te[9] = 0;
        te[10] = cosr;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    fromRotationZ(r: number): Matrix4 {
        const te = this.entries;
        const cosr = Math.cos(r);
        const sinr = Math.sin(r);
        te[0] = cosr;
        te[1] = -sinr;
        te[2] = 0;
        te[3] = 0;
        te[4] = sinr;
        te[5] = cosr;
        te[6] = 0;
        te[7] = 0;
        te[8] = 0;
        te[9] = 0;
        te[10] = 1;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    fromScale(x: number, y: number, z: number): Matrix4 {
        const te = this.entries;
        te[0] = x;
        te[1] = 0;
        te[2] = 0;
        te[3] = 0;
        te[4] = 0;
        te[5] = y;
        te[6] = 0;
        te[7] = 0;
        te[8] = 0;
        te[9] = 0;
        te[10] = z;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    fromSkew(
        xy: number,
        xz: number,
        yx: number,
        yz: number,
        zx: number,
        zy: number): Matrix4 {
        const te = this.entries;
        te[0] = 1;
        te[1] = xy;
        te[2] = xz;
        te[3] = 0;
        te[4] = yx;
        te[5] = 1;
        te[6] = yz;
        te[7] = 0;
        te[8] = zx;
        te[9] = zy;
        te[10] = 1;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    fromTranslation(x: number, y: number, z: number): Matrix4 {
        const te = this.entries;
        te[0] = 1;
        te[1] = 0;
        te[2] = 0;
        te[3] = x;
        te[4] = 0;
        te[5] = 1;
        te[6] = 0;
        te[7] = y;
        te[8] = 0;
        te[9] = 0;
        te[10] = 1;
        te[11] = z;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    identity(): Matrix4 {
        const te = this.entries;
        te[0] = 1;
        te[1] = 0;
        te[2] = 0;
        te[3] = 0;
        te[4] = 0;
        te[5] = 1;
        te[6] = 0;
        te[7] = 0;
        te[8] = 0;
        te[9] = 0;
        te[10] = 1;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    }

    invert(): Matrix4 {
        const self = this;
        const te = self.entries;
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

        const d00 = self._det3(t11, t12, t13, t21, t22, t23, t31, t32, t33);
        const d01 = self._det3(t10, t12, t13, t20, t22, t23, t30, t32, t33);
        const d02 = self._det3(t10, t11, t13, t20, t21, t23, t30, t31, t33);
        const d03 = self._det3(t10, t11, t12, t20, t21, t22, t30, t31, t32);
        const d10 = self._det3(t01, t02, t03, t21, t22, t23, t31, t32, t33);
        const d11 = self._det3(t00, t02, t03, t20, t22, t23, t30, t32, t33);
        const d12 = self._det3(t00, t01, t03, t20, t21, t23, t30, t31, t33);
        const d13 = self._det3(t00, t01, t02, t20, t21, t22, t30, t31, t32);
        const d20 = self._det3(t01, t02, t03, t11, t12, t13, t31, t32, t33);
        const d21 = self._det3(t00, t02, t03, t10, t12, t13, t30, t32, t33);
        const d22 = self._det3(t00, t01, t03, t10, t11, t13, t30, t31, t33);
        const d23 = self._det3(t00, t01, t02, t10, t11, t12, t30, t31, t32);
        const d30 = self._det3(t01, t02, t03, t11, t12, t13, t21, t22, t23);
        const d31 = self._det3(t00, t02, t03, t10, t12, t13, t20, t22, t23);
        const d32 = self._det3(t00, t01, t03, t10, t11, t13, t20, t21, t23);
        const d33 = self._det3(t00, t01, t02, t10, t11, t12, t20, t21, t22);

        const det = t00 * d00 - t01 * d01 + t02 * d02 - t03 * d03;

        te[0] = d00 / det;
        te[1] = -d10 / det;
        te[2] = d20 / det;
        te[3] = -d30 / det;
        te[4] = -d01 / det;
        te[5] = d11 / det;
        te[6] = -d21 / det;
        te[7] = d31 / det;
        te[8] = d02 / det;
        te[9] = -d12 / det;
        te[10] = d22 / det;
        te[11] = -d32 / det;
        te[12] = -d03 / det;
        te[13] = d13 / det;
        te[14] = -d23 / det;
        te[15] = d33 / det;

        return this;
    }

    invertible(): boolean { return this.determinant() !== 0; }

    /**
     * Multiplies this matrix with another matrix
     * from the left (Other * This).
     * @param {Matrix4} m - Other matrix.
     * @returns {Matrix4} This matrix.
     */
    mul(m: Matrix4): Matrix4 {
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

    toMatrix3(): Matrix3 {
        const te = this.entries;
        return new Matrix3()
            .fromArray([
                te[0],
                te[1],
                te[2],
                te[4],
                te[5],
                te[6],
                te[8],
                te[9],
                te[10],
            ]);
    }

    transpose(): Matrix4 {
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

    private _det2(
        m00: number,
        m01: number,
        m10: number,
        m11: number): number {
        return m00 * m11 - m01 * m10;
    }

    private _det3(
        m00: number,
        m01: number,
        m02: number,
        m10: number,
        m11: number,
        m12: number,
        m20: number,
        m21: number,
        m22: number): number {
        const self = this;
        const d00 = self._det2(m11, m12, m21, m22);
        const d01 = self._det2(m10, m12, m20, m22);
        const d02 = self._det2(m10, m11, m20, m21);

        return m00 * d00 - m01 * d01 + m02 * d02;
    }
}
