import { Matrix3 } from '../../src/math/Matrix3.js';

test('create matrix', () => {
    const matrix = new Matrix3();
    expect(matrix).toBeDefined();
    expect(matrix).toBeInstanceOf(Matrix3);
});

test('return identity entries', () => {
    const matrix = new Matrix3();
    expect(matrix.entries).toEqual([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ]);
});

test('cloning a matrix', () => {
    const array = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ];
    const matrix = new Matrix3()
        .fromArray(array);

    const clone = matrix.clone();

    expect(clone).not.toBe(matrix);
    expect(clone).toBeInstanceOf(Matrix3);

    expect(clone.entries).toEqual(array);
});

test('identical matrix equality', () => {
    const matrix1 = new Matrix3();
    matrix1.fromArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]);
    const matrix2 = new Matrix3();
    matrix2.fromArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]);

    expect(matrix1.equals(matrix2)).toBe(true);
    expect(matrix2.equals(matrix1)).toBe(true);
    expect(matrix1.equals(matrix1)).toBe(true);
    expect(matrix2.equals(matrix2)).toBe(true);
});

test('non-indentical matrix equality', () => {
    const matrix1 = new Matrix3();
    matrix1.fromArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]);
    const matrix2 = new Matrix3();
    matrix2.fromArray([
        9, 8, 7,
        6, 5, 4,
        3, 2, 1,
    ]);

    expect(matrix1.equals(matrix2)).toBe(false);
    expect(matrix2.equals(matrix1)).toBe(false);
});

test('transpose a matrix', () => {
    const matrix = new Matrix3();
    matrix.fromArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]);

    matrix.transpose();

    expect(matrix.toArray()).toEqual([
        1, 4, 7,
        2, 5, 8,
        3, 6, 9,
    ]);
});
