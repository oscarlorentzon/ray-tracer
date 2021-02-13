import { Matrix } from "../src/Matrix.js";

export function expectMatrixToBe(
    matrix: Matrix,
    expected: Array<number>): void {

    const me = matrix.entries;
    expect(me.length).toBe(16);

    for (let i = 0; i < me.length; ++i) {
        expect(me[i]).toBe(expected[i]);
    }
}
