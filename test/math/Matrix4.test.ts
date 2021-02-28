import { Matrix3 } from "../../src/math/Matrix3.js";
import { Matrix4 } from "../../src/math/Matrix4.js";
import {
    expectMatrixToBe,
    expectMatrixToBeCloseTo,
} from "../Util.js";

test('create matrix', () => {
    const matrix = new Matrix4();
    expect(matrix).toBeDefined();
    expect(matrix).toBeInstanceOf(Matrix4);
});

test('return identity entries', () => {
    const matrix = new Matrix4();
    expectMatrixToBe(matrix.entries, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
});

test('cloning a matrix', () => {
    const array = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ];
    const matrix = new Matrix4()
        .fromArray(array);

    const clone = matrix.clone();

    expect(clone).not.toBe(matrix);
    expect(clone).toBeInstanceOf(Matrix4);

    expect(clone.entries).toEqual(array);
});

test('taking the upper left 3 x 3 submatrix of a matrix', () => {
    const array = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ];
    const matrix3 = new Matrix4()
        .fromArray(array)
        .toMatrix3();

    expect(matrix3).toBeDefined();
    expect(matrix3).toBeInstanceOf(Matrix3);

    expect(matrix3.entries).toEqual([
        1, 2, 3,
        5, 6, 7,
        9, 10, 11,
    ]);
});

test('set matrix from array', () => {
    const matrix = new Matrix4();
    const fromArray = matrix.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);

    expect(fromArray).toBe(matrix);
    expect(fromArray).toBeInstanceOf(Matrix4);

    expectMatrixToBe(matrix.entries, [
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
});

test('identical matrix equality', () => {
    const matrix1 = new Matrix4();
    matrix1.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
    const matrix2 = new Matrix4();
    matrix2.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);

    expect(matrix1.equals(matrix2)).toBe(true);
    expect(matrix2.equals(matrix1)).toBe(true);
    expect(matrix1.equals(matrix1)).toBe(true);
    expect(matrix2.equals(matrix2)).toBe(true);
});

test('non-indentical matrix equality', () => {
    const matrix1 = new Matrix4();
    matrix1.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
    const matrix2 = new Matrix4();
    matrix2.fromArray([
        17, 16, 15, 14,
        13, 12, 11, 10,
        9, 8, 7, 6,
        5, 4, 3, 2,
    ]);

    expect(matrix1.equals(matrix2)).toBe(false);
    expect(matrix2.equals(matrix1)).toBe(false);
});

test('mulitply two matrices with no side effects', () => {
    const matrix1 = new Matrix4();
    matrix1.fromArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2,
    ]);
    const matrix2 = new Matrix4();
    matrix2.fromArray([
        -2, 1, 2, 3,
        3, 2, 1, -1,
        4, 3, 6, 5,
        1, 2, 7, 8,
    ]);

    const multiplied = matrix2.mul(matrix1);

    expect(multiplied).toBe(matrix2);
    expect(multiplied).toBeInstanceOf(Matrix4);

    expectMatrixToBe(
        matrix2.entries,
        [
            20, 22, 50, 48,
            44, 54, 114, 108,
            40, 58, 110, 102,
            16, 26, 46, 42,
        ]);

    expectMatrixToBe(
        matrix1.entries,
        [
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 8, 7, 6,
            5, 4, 3, 2,
        ]);
});

test('multiply with identity', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ]);
    const identity = new Matrix4();
    matrix.mul(identity);

    expectMatrixToBe(matrix.entries, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ]);
});

test('transpose matrix', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        0, 9, 3, 0,
        9, 8, 0, 8,
        1, 8, 5, 3,
        0, 0, 5, 8,
    ]);
    const transposed = matrix.transpose();

    expect(transposed).toBe(matrix);
    expect(transposed).toBeInstanceOf(Matrix4);

    expectMatrixToBe(matrix.entries, [
        0, 9, 1, 0,
        9, 8, 8, 0,
        3, 0, 5, 5,
        0, 8, 3, 8,
    ]);
});

test('transpose matrix twice', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        0, 9, 1, 0,
        9, 8, -4, 2,
        -3, 7, 1, 0,
        4, -1, 1, 1,
    ]);
    const transposedTwice = matrix
        .transpose()
        .transpose();

    expect(transposedTwice).toBe(matrix);
    expect(transposedTwice).toBeInstanceOf(Matrix4);

    expectMatrixToBe(matrix.entries, [
        0, 9, 1, 0,
        9, 8, -4, 2,
        -3, 7, 1, 0,
        4, -1, 1, 1,
    ]);
});

test('transpose identity matrix', () => {
    const identity = new Matrix4();
    identity.transpose();

    expectMatrixToBe(identity.entries, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
});

test('determinant', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        -2, -8, 3, 5,
        -3, 1, 7, 3,
        1, 2, -9, 6,
        -6, 7, 7, -9,
    ]);
    const determinant = matrix.determinant();

    expect(determinant).toBe(-4071);
});

test('invertible', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        6, 4, 4, 4,
        5, 5, 7, 6,
        4, -9, 3, -7,
        9, 1, 7, -6,
    ]);
    const determinant = matrix.determinant();
    expect(determinant).toBe(-2120);
    expect(matrix.invertible()).toBe(true);
});

test('not invertible', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        -4, 2, -2, -3,
        9, 6, 2, 6,
        0, -5, 1, -5,
        0, 0, 0, 0,
    ]);
    const determinant = matrix.determinant();
    expect(determinant).toBe(0);
    expect(matrix.invertible()).toBe(false);
});

test('invert matrix 1', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        -5, 2, 6, -8,
        1, -5, 1, 8,
        7, 7, -6, -7,
        1, -3, 7, 4,
    ]);
    const determinant = matrix.determinant();
    expect(determinant).toBe(532);
    expect(matrix.invertible()).toBe(true);

    matrix.invert();
    expectMatrixToBeCloseTo(
        matrix.entries,
        [
            0.21805, 0.45113, 0.24060, -0.04511,
            -0.80827, -1.45677, -0.44361, 0.52068,
            -0.07895, -0.22368, -0.05263, 0.19737,
            -0.52256, -0.81391, -0.30075, 0.30639,
        ],
        5);
});

test('invert matrix 2', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        8, -5, 9, 2,
        7, 5, 6, 1,
        -6, 0, 9, 6,
        -3, 0, -9, -4,
    ]);

    expect(matrix.invertible()).toBe(true);
    matrix.invert();
    expectMatrixToBeCloseTo(
        matrix.entries,
        [
            -0.15385, -0.15385, -0.28205, -0.53846,
            -0.07692, 0.12308, 0.02564, 0.03077,
            0.35897, 0.35897, 0.43590, 0.92308,
            -0.69231, -0.69231, -0.76923, -1.92308,
        ],
        5);
});

test('invert matrix 3', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2,
    ]);

    expect(matrix.invertible()).toBe(true);
    matrix.invert();
    expectMatrixToBeCloseTo(
        matrix.entries,
        [
            -0.04074, -0.07778, 0.14444, -0.22222,
            -0.07778, 0.03333, 0.36667, -0.33333,
            -0.02901, -0.14630, -0.10926, 0.12963,
            0.17778, 0.06667, -0.26667, 0.33333,
        ],
        5);
});

test('invert twice', () => {
    const matrix = new Matrix4();
    matrix.fromArray([
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2,
    ]);

    expect(matrix.invertible()).toBe(true);
    matrix.invert();
    expect(matrix.invertible()).toBe(true);
    matrix.invert();

    expectMatrixToBeCloseTo(
        matrix.entries,
        [
            9, 3, 0, 9,
            -5, -2, -6, -3,
            -4, 9, 6, 4,
            -7, 6, 6, 2,
        ],
        5);
});

test('invert and multiply', () => {
    const array = [
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2,
    ];
    const matrix1 = new Matrix4();
    matrix1.fromArray(array);
    matrix1.invert();
    const matrix2 = new Matrix4();
    matrix2.fromArray(array);
    matrix1.mul(matrix2);

    const indentity = new Matrix4().toArray();
    expectMatrixToBeCloseTo(matrix1.entries, indentity, 5);
});

test('multiply inverted', () => {
    const array = [
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2,
    ];
    const matrix1 = new Matrix4();
    matrix1.fromArray(array);
    matrix1.invert();
    const matrix2 = new Matrix4();
    matrix2.fromArray(array);
    matrix2.mul(matrix1);

    const indentity = new Matrix4().entries;
    expectMatrixToBeCloseTo(matrix2.entries, indentity, 5);
});

test('invert identity', () => {
    const identity = new Matrix4();
    identity.invert();

    expectMatrixToBeCloseTo(
        identity.entries,
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ],
        6);
});

test('inverted of transpose and transpose of inverted', () => {
    const array = [
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2,
    ];
    const matrix1 = new Matrix4();
    matrix1.fromArray(array);
    matrix1
        .invert()
        .transpose();
    const matrix2 = new Matrix4();
    matrix2.fromArray(array);
    matrix2
        .transpose()
        .invert();

    expect(matrix1.equals(matrix2)).toBe(true);
    expect(matrix2.equals(matrix1)).toBe(true);
});

test('from translation', () => {
    const matrix = new Matrix4();
    const translation = matrix.fromTranslation(4, 11, -15);

    expect(translation).toBe(matrix);
    expect(translation).toBeInstanceOf(Matrix4);

    expectMatrixToBe(
        translation.entries,
        [
            1, 0, 0, 4,
            0, 1, 0, 11,
            0, 0, 1, -15,
            0, 0, 0, 1,
        ]);
});

test('from scale', () => {
    const matrix = new Matrix4();
    const scale = matrix.fromScale(11, -14, 3);

    expect(scale).toBe(matrix);
    expect(scale).toBeInstanceOf(Matrix4);

    expectMatrixToBe(
        scale.entries,
        [
            11, 0, 0, 0,
            0, -14, 0, 0,
            0, 0, 3, 0,
            0, 0, 0, 1,
        ]);
});

test('from rotation x', () => {
    const matrix = new Matrix4();
    const rotationX = matrix.fromRotationX(Math.PI / 2);

    expect(rotationX).toBe(matrix);
    expect(rotationX).toBeInstanceOf(Matrix4);

    expectMatrixToBeCloseTo(
        rotationX.entries,
        [
            1, 0, 0, 0,
            0, 0, -1, 0,
            0, 1, 0, 0,
            0, 0, 0, 1,
        ],
        6);
});

test('from rotation y', () => {
    const matrix = new Matrix4();
    const rotationY = matrix.fromRotationY(Math.PI / 2);

    expect(rotationY).toBe(matrix);
    expect(rotationY).toBeInstanceOf(Matrix4);

    expectMatrixToBeCloseTo(
        rotationY.entries,
        [
            0, 0, 1, 0,
            0, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 0, 1,
        ],
        6);
});

test('from rotation z', () => {
    const matrix = new Matrix4();
    const rotationZ = matrix.fromRotationZ(Math.PI / 2);

    expect(rotationZ).toBe(matrix);
    expect(rotationZ).toBeInstanceOf(Matrix4);

    expectMatrixToBeCloseTo(
        rotationZ.entries,
        [
            0, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ],
        6);
});

test('from skew', () => {
    const matrix = new Matrix4();
    const skew = matrix.fromSkew(2, 3, 4, 5, 6, 7);

    expect(skew).toBe(matrix);
    expect(skew).toBeInstanceOf(Matrix4);

    expectMatrixToBe(
        skew.entries,
        [
            1, 2, 3, 0,
            4, 1, 5, 0,
            6, 7, 1, 0,
            0, 0, 0, 1,
        ]);
});
