import { Matrix } from '../../src/math/Matrix.js';
import { Point } from '../../src/math/Point.js';
import { Vector } from '../../src/math/Vector.js';
import { expectMatrixToBe } from '../Util.js';

test('creates point', () => {
    const point = new Point(0, 0, 0);
    expect(point).toBeDefined();
    expect(point).toBeInstanceOf(Point);
});

test('sets the coordinates', () => {
    const point = new Point(2, 3, 4);
    expect(point).toBeInstanceOf(Point);
    expect(point.x).toBe(2);
    expect(point.y).toBe(3);
    expect(point.z).toBe(4);
    expect(point.w).toBe(1);
});

test('equals when same', () => {
    const point1 = new Point(2, 3, 4);
    const point2 = new Point(2, 3, 4);

    expect(point1.equals(point1)).toBe(true);
    expect(point2.equals(point2)).toBe(true);
    expect(point1.equals(point2)).toBe(true);
    expect(point2.equals(point1)).toBe(true);
});

test('equals when different', () => {
    const point1 = new Point(2, 3, 4);
    const point2 = new Point(2, 3.0001, 4);

    expect(point1.equals(point2)).toBe(false);
    expect(point2.equals(point1)).toBe(false);
});

test('adding a vector to a point to add each coordinate', () => {
    const point = new Point(1, 2, 3);
    const vec = new Vector(3, 6, 9);

    const sum = point.addVector(vec);

    expect(sum).toBe(point);
    expect(sum).toBeInstanceOf(Point);

    expect(sum.x).toBe(4);
    expect(sum.y).toBe(8);
    expect(sum.z).toBe(12);
    expect(sum.w).toBe(1);

    expect(point.x).toBe(4);
    expect(point.y).toBe(8);
    expect(point.z).toBe(12);
    expect(point.w).toBe(1);
});

test('subtracting a vector from a point to subtract each coordinate', () => {
    const point = new Point(1, 2, 3);
    const vec = new Vector(3, 6, 9);

    const diff = point.subVector(vec);

    expect(diff).toBe(point);
    expect(diff).toBeInstanceOf(Point);

    expect(diff.x).toBe(-2);
    expect(diff.y).toBe(-4);
    expect(diff.z).toBe(-6);
    expect(diff.w).toBe(1);

    expect(point.x).toBe(-2);
    expect(point.y).toBe(-4);
    expect(point.z).toBe(-6);
    expect(point.w).toBe(1);
});

test('subtracting a point from a point to subtract each coordinate', () => {
    const point1 = new Point(1, 2, 3);
    const point2 = new Point(3, 6, 9);

    const diff = point1.sub(point2);

    expect(diff).not.toBe(point1);
    expect(diff).toBeInstanceOf(Vector);

    expect(diff.x).toBe(-2);
    expect(diff.y).toBe(-4);
    expect(diff.z).toBe(-6);
    expect(diff.w).toBe(0);

    expect(point1.x).toBe(1);
    expect(point1.y).toBe(2);
    expect(point1.z).toBe(3);
    expect(point1.w).toBe(1);

    expect(point2.x).toBe(3);
    expect(point2.y).toBe(6);
    expect(point2.z).toBe(9);
    expect(point2.w).toBe(1);
});

test('multiply a point by a scalar', () => {
    const point = new Point(1, -2, 3);
    const product = point.mulScalar(3.5);

    expect(product).toBe(point);
    expect(product).toBeInstanceOf(Point);

    expect(product.x).toBe(3.5);
    expect(product.y).toBe(-7);
    expect(product.z).toBe(10.5);
    expect(product.w).toBe(3.5);

    expect(point.x).toBe(3.5);
    expect(point.y).toBe(-7);
    expect(point.z).toBe(10.5);
    expect(point.w).toBe(3.5);
});

test('multiply a point by a fraction', () => {
    const point = new Point(1, -2, 3);
    const product = point.mulScalar(0.5);

    expect(product).toBe(point);
    expect(product).toBeInstanceOf(Point);

    expect(product.x).toBe(0.5);
    expect(product.y).toBe(-1);
    expect(product.z).toBe(1.5);
    expect(product.w).toBe(0.5);

    expect(point.x).toBe(0.5);
    expect(point.y).toBe(-1);
    expect(point.z).toBe(1.5);
    expect(point.w).toBe(0.5);
});

test('multiply a point by a matrix', () => {
    const point = new Point(1, 2, 3);
    const matrix = new Matrix()
        .fromArray([
            1, 2, 3, 4,
            2, 4, 4, 2,
            8, 6, 4, 1,
            0, 0, 0, 1,
        ]);
    const multiplied = point.mulMatrix(matrix);

    expect(multiplied).toBe(point);
    expect(multiplied).toBeInstanceOf(Point);

    expect(point.x).toBe(18);
    expect(point.y).toBe(24);
    expect(point.z).toBe(33);
    expect(point.w).toBe(1);
});

test('multiply a point by a matrix with no side effects', () => {
    const point = new Point(1, 2, 3);
    const matrix = new Matrix()
        .fromArray([
            1, 2, 3, 4,
            2, 4, 4, 2,
            8, 6, 4, 1,
            0, 0, 0, 1,
        ]);
    point.mulMatrix(matrix);

    expectMatrixToBe(
        matrix.entries,
        [
            1, 2, 3, 4,
            2, 4, 4, 2,
            8, 6, 4, 1,
            0, 0, 0, 1,
        ]);
});

test('multiply by a translation matrix', () => {
    const point = new Point(-3, 4, 5);
    const translation = new Matrix()
        .fromTranslation(5, -3, 2);

    point.mulMatrix(translation);

    expect(point.x).toBe(2);
    expect(point.y).toBe(1);
    expect(point.z).toBe(7);
    expect(point.w).toBe(1);
});

test('multiply by inverse of a translation matrix', () => {
    const point = new Point(-3, 4, 5);
    const translation = new Matrix()
        .fromTranslation(5, -3, 2)
        .invert();

    point.mulMatrix(translation);

    expect(point.x).toBe(-8);
    expect(point.y).toBe(7);
    expect(point.z).toBe(3);
    expect(point.w).toBe(1);
});

test('multiply by a scaling matrix', () => {
    const point = new Point(-4, 6, 8);
    const scaling = new Matrix()
        .fromScale(2, 3, 4);

    point.mulMatrix(scaling);

    expect(point.x).toBe(-8);
    expect(point.y).toBe(18);
    expect(point.z).toBe(32);
    expect(point.w).toBe(1);
});

test('multiply by inverse of a scaling matrix', () => {
    const point = new Point(-4, 6, 8);
    const scaling = new Matrix()
        .fromScale(2, 3, 4)
        .invert();

    point.mulMatrix(scaling);

    expect(point.x).toBe(-2);
    expect(point.y).toBe(2);
    expect(point.z).toBe(2);
    expect(point.w).toBe(1);
});

test('reflection is scaling by a negative value', () => {
    const point = new Point(2, 3, 4);
    const scaling = new Matrix()
        .fromScale(-1, 1, 1);

    point.mulMatrix(scaling);

    expect(point.x).toBe(-2);
    expect(point.y).toBe(3);
    expect(point.z).toBe(4);
    expect(point.w).toBe(1);
});

test('multiply by a 90 degree x-rotation matrix', () => {
    const point = new Point(0, 1, 0);
    const rotationX = new Matrix()
        .fromRotationX(Math.PI / 2);

    point.mulMatrix(rotationX);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(1);
    expect(point.w).toBeCloseTo(1);
});

test('multiply by a 45 degree x-rotation matrix', () => {
    const point = new Point(0, 1, 0);
    const rotationX = new Matrix()
        .fromRotationX(Math.PI / 4);

    point.mulMatrix(rotationX);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(Math.sqrt(2) / 2);
    expect(point.z).toBeCloseTo(Math.sqrt(2) / 2);
    expect(point.w).toBeCloseTo(1);
});

test('multiply by a minus 90 degree x-rotation matrix', () => {
    const point = new Point(0, 1, 0);
    const rotationX = new Matrix()
        .fromRotationX(-Math.PI / 2);

    point.mulMatrix(rotationX);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(-1);
    expect(point.w).toBeCloseTo(1);
});

test('multiply by inverse of a 90 degree x-rotation matrix', () => {
    const point = new Point(0, 1, 0);
    const rotationX = new Matrix()
        .fromRotationX(Math.PI / 2)
        .invert();

    point.mulMatrix(rotationX);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(-1);
    expect(point.w).toBeCloseTo(1);
});

test('multiply by a 90 degree y-rotation matrix', () => {
    const point = new Point(0, 0, 1);
    const rotationY = new Matrix()
        .fromRotationY(Math.PI / 2);

    point.mulMatrix(rotationY);

    expect(point.x).toBeCloseTo(1);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(0);
    expect(point.w).toBeCloseTo(1);
});

test('multiply by a 90 degree z-rotation matrix', () => {
    const point = new Point(0, 1, 0);
    const rotationZ = new Matrix()
        .fromRotationZ(Math.PI / 2);

    point.mulMatrix(rotationZ);

    expect(point.x).toBeCloseTo(-1);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(0);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves x in proportion to y', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(1, 0, 0, 0, 0, 0);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(5);
    expect(point.y).toBeCloseTo(3);
    expect(point.z).toBeCloseTo(4);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves x in proportion to z', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(0, 1, 0, 0, 0, 0);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(6);
    expect(point.y).toBeCloseTo(3);
    expect(point.z).toBeCloseTo(4);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves y in proportion to x', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(0, 0, 1, 0, 0, 0);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(2);
    expect(point.y).toBeCloseTo(5);
    expect(point.z).toBeCloseTo(4);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves y in proportion to z', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(0, 0, 0, 1, 0, 0);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(2);
    expect(point.y).toBeCloseTo(7);
    expect(point.z).toBeCloseTo(4);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves z in proportion to x', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(0, 0, 0, 0, 1, 0);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(2);
    expect(point.y).toBeCloseTo(3);
    expect(point.z).toBeCloseTo(6);
    expect(point.w).toBeCloseTo(1);
});

test('a skew transform moves z in proportion to y', () => {
    const point = new Point(2, 3, 4);
    const skewXY = new Matrix()
        .fromSkew(0, 0, 0, 0, 0, 1);

    point.mulMatrix(skewXY);

    expect(point.x).toBeCloseTo(2);
    expect(point.y).toBeCloseTo(3);
    expect(point.z).toBeCloseTo(7);
    expect(point.w).toBeCloseTo(1);
});

test('individual transforms are applied in sequence', () => {
    const point = new Point(1, 0, 1);

    const rotateX = new Matrix()
        .fromRotationX(Math.PI / 2);
    const scaling = new Matrix()
        .fromScale(5, 5, 5);
    const translation = new Matrix()
        .fromTranslation(10, 5, 7);

    point.mulMatrix(rotateX);
    expect(point.x).toBeCloseTo(1);
    expect(point.y).toBeCloseTo(-1);
    expect(point.z).toBeCloseTo(0);
    expect(point.w).toBeCloseTo(1);

    point.mulMatrix(scaling);
    expect(point.x).toBeCloseTo(5);
    expect(point.y).toBeCloseTo(-5);
    expect(point.z).toBeCloseTo(0);
    expect(point.w).toBeCloseTo(1);

    point.mulMatrix(translation);
    expect(point.x).toBeCloseTo(15);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(7);
    expect(point.w).toBeCloseTo(1);
});

test('chained transforms are applied in reverse order', () => {
    const point = new Point(1, 0, 1);

    const transform = new Matrix()
        .fromRotationX(Math.PI / 2)
        .mul(new Matrix().fromScale(5, 5, 5))
        .mul(new Matrix().fromTranslation(10, 5, 7));

    point.mulMatrix(transform);
    expect(point.x).toBeCloseTo(15);
    expect(point.y).toBeCloseTo(0);
    expect(point.z).toBeCloseTo(7);
    expect(point.w).toBeCloseTo(1);
});

test('cloning a point', () => {
    const point = new Point(1, -2, 3);
    const clone = point.clone();

    expect(clone).not.toBe(point);
    expect(clone).toBeInstanceOf(Point);

    expect(clone.x).toBe(1);
    expect(clone.y).toBe(-2);
    expect(clone.z).toBe(3);
    expect(clone.w).toBe(1);
});
