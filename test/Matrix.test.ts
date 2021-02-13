import { Matrix } from "../src/Matrix.js";
import { expectMatrixToBe } from "./Util.js";

test('create matrix', () => {
    const matrix = new Matrix();
    expect(matrix).toBeDefined();
    expect(matrix).toBeInstanceOf(Matrix);
});

test('return identity entries', () => {
    const matrix = new Matrix();
    const entries = matrix.entries;

    expectMatrixToBe(matrix, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
});

test('set matrix from array', () => {
    const matrix = new Matrix();
    const fromArray = matrix.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);

    expect(fromArray).toBe(matrix);
    expect(fromArray).toBeInstanceOf(Matrix);

    expectMatrixToBe(matrix, [
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
});

test('identical matrix equality', () => {
    const matrix1 = new Matrix();
    matrix1.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
    const matrix2 = new Matrix();
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
    const matrix1 = new Matrix();
    matrix1.fromArray([
        2, 3, 4, 5,
        6, 7, 8, 9,
        10, 11, 12, 13,
        14, 15, 16, 17,
    ]);
    const matrix2 = new Matrix();
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
    const matrix1 = new Matrix();
    matrix1.fromArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2,
    ]);
    const matrix2 = new Matrix();
    matrix2.fromArray([
        -2, 1, 2, 3,
        3, 2, 1, -1,
        4, 3, 6, 5,
        1, 2, 7, 8,
    ]);

    const multiplied = matrix2.mul(matrix1);

    expect(multiplied).toBe(matrix2);
    expect(multiplied).toBeInstanceOf(Matrix);

    expectMatrixToBe(matrix2, [
        20, 22, 50, 48,
        44, 54, 114, 108,
        40, 58, 110, 102,
        16, 26, 46, 42,
    ]);

    expectMatrixToBe(matrix1, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2,
    ]);
});

test('multiply with identity', () => {
    const matrix = new Matrix();
    matrix.fromArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ]);
    const identity = new Matrix();
    matrix.mul(identity);

    expectMatrixToBe(matrix, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ]);
});

test('transpose matrix', () => {
    const matrix = new Matrix();
    matrix.fromArray([
        0, 9, 3, 0,
        9, 8, 0, 8,
        1, 8, 5, 3,
        0, 0, 5, 8,
    ]);
    const transposed = matrix.transpose();

    expect(transposed).toBe(matrix);
    expect(transposed).toBeInstanceOf(Matrix);

    expectMatrixToBe(matrix, [
        0, 9, 1, 0,
        9, 8, 8, 0,
        3, 0, 5, 5,
        0, 8, 3, 8,
    ]);
});

test('transpose matrix twice', () => {
    const matrix = new Matrix();
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
    expect(transposedTwice).toBeInstanceOf(Matrix);

    expectMatrixToBe(matrix, [
        0, 9, 1, 0,
        9, 8, -4, 2,
        -3, 7, 1, 0,
        4, -1, 1, 1,
    ]);
});

test('transpose identity matrix', () => {
    const identity = new Matrix();
    identity.transpose();

    expectMatrixToBe(identity, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
});
