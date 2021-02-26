import { Point } from '../../src/math/Point.js';
import { Vector } from '../../src/math/Vector.js';
import { Matrix } from '../../src/ray-tracer.js';
import { Ray } from '../../src/trace/Ray.js';

test('creates ray', () => {
    const origin = new Point(0, 0, 0);
    const direction = new Vector(0, 0, -1);
    const ray = new Ray(origin, direction);
    expect(ray).toBeDefined();
    expect(ray).toBeInstanceOf(Ray);
});

test('sets origin and direction', () => {
    const origin = new Point(1, 2, 3);
    const direction = new Vector(-1, -2, -3);
    const ray = new Ray(origin, direction);

    expect(ray.origin).toBeDefined();
    expect(ray.origin).toBeInstanceOf(Point);
    expect(ray.origin).toBe(origin);
    expect(ray.origin.x).toBe(1);
    expect(ray.origin.y).toBe(2);
    expect(ray.origin.z).toBe(3);
    expect(ray.origin.w).toBe(1);

    expect(ray.direction).toBeDefined();
    expect(ray.direction).toBeInstanceOf(Vector);
    expect(ray.direction).toBe(direction);
    expect(ray.direction.x).toBe(-1);
    expect(ray.direction.y).toBe(-2);
    expect(ray.direction.z).toBe(-3);
    expect(ray.direction.w).toBe(0);
});

test('compute position at time', () => {
    const origin = new Point(2, 3, 4);
    const direction = new Vector(1, 0, 0);
    const ray = new Ray(origin, direction);

    const pos0 = ray.position(0);
    expect(pos0.x).toBe(2);
    expect(pos0.y).toBe(3);
    expect(pos0.z).toBe(4);
    expect(pos0.w).toBe(1);

    const pos1 = ray.position(1);
    expect(pos1.x).toBe(3);
    expect(pos1.y).toBe(3);
    expect(pos1.z).toBe(4);
    expect(pos1.w).toBe(1);

    const pos2 = ray.position(-1);
    expect(pos2.x).toBe(1);
    expect(pos2.y).toBe(3);
    expect(pos2.z).toBe(4);
    expect(pos2.w).toBe(1);

    const pos3 = ray.position(2.5);
    expect(pos3.x).toBe(4.5);
    expect(pos3.y).toBe(3);
    expect(pos3.z).toBe(4);
    expect(pos3.w).toBe(1);
});

test('compute position does not change origin or direction', () => {
    const ray = new Ray(
        new Point(2, 3, 4),
        new Vector(-1, -2, -3));

    ray.position(-4);

    const origin = ray.origin;
    expect(origin.x).toBe(2)
    expect(origin.y).toBe(3);
    expect(origin.z).toBe(4);
    expect(origin.w).toBe(1);

    const direction = ray.direction;
    expect(direction.x).toBe(-1)
    expect(direction.y).toBe(-2);
    expect(direction.z).toBe(-3);
    expect(direction.w).toBe(0);
});

test('cloning a ray', () => {
    const ray = new Ray(
        new Point(2, 3, 4),
        new Vector(-1, -2, -3));

    const clone = ray.clone();

    expect(clone).toBeInstanceOf(Ray);
    expect(clone).not.toBe(ray);
    expect(clone.origin).not.toBe(ray.origin);
    expect(clone.direction).not.toBe(ray.direction);

    const origin = clone.origin;
    expect(origin.x).toBe(2)
    expect(origin.y).toBe(3);
    expect(origin.z).toBe(4);
    expect(origin.w).toBe(1);

    const direction = clone.direction;
    expect(direction.x).toBe(-1)
    expect(direction.y).toBe(-2);
    expect(direction.z).toBe(-3);
    expect(direction.w).toBe(0);
});

test('applying a matrix on a ray should return the ray', () => {
    const ray = new Ray(
        new Point(1, 2, 3),
        new Vector(0, 1, 0));

    const translation = new Matrix()
        .fromTranslation(3, 4, 5);

    const translated = ray.applyMatrix(translation);

    expect(translated).toBeInstanceOf(Ray);
    expect(translated).toBe(ray);
});

test('translating a ray', () => {
    const ray = new Ray(
        new Point(1, 2, 3),
        new Vector(0, 1, 0));

    const translation = new Matrix()
        .fromTranslation(3, 4, 5);

    ray.applyMatrix(translation);

    const origin = ray.origin;
    expect(origin.x).toBe(4)
    expect(origin.y).toBe(6);
    expect(origin.z).toBe(8);
    expect(origin.w).toBe(1);

    const direction = ray.direction;
    expect(direction.x).toBe(0)
    expect(direction.y).toBe(1);
    expect(direction.z).toBe(0);
    expect(direction.w).toBe(0);
});

test('scaling a ray', () => {
    const ray = new Ray(
        new Point(1, 2, 3),
        new Vector(0, 1, 0));

    const scaling = new Matrix()
        .fromScale(2, 3, 4);

    ray.applyMatrix(scaling);

    const origin = ray.origin;
    expect(origin.x).toBe(2)
    expect(origin.y).toBe(6);
    expect(origin.z).toBe(12);
    expect(origin.w).toBe(1);

    const direction = ray.direction;
    expect(direction.x).toBe(0)
    expect(direction.y).toBe(3);
    expect(direction.z).toBe(0);
    expect(direction.w).toBe(0);
});
