import { Point } from '../src/Point';
import { Vector } from '../src/Vector';

test('creates point to be defined', () => {
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
