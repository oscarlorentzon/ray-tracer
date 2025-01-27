import { Matrix4 } from '../../src/math/Matrix4.js';
import { Vector } from '../../src/math/Vector.js';
import { expectMatrixToBe } from '../util/expect.js';

test('create vector', () => {
    const vec = new Vector(0, 0, 0);
    expect(vec).toBeDefined();
    expect(vec).toBeInstanceOf(Vector);
});

test('creates sets the coordinates', () => {
    const vec = new Vector(2, 3, 4);
    expect(vec).toBeInstanceOf(Vector);
    expect(vec.x).toBe(2);
    expect(vec.y).toBe(3);
    expect(vec.z).toBe(4);
    expect(vec.w).toBe(0);
});

test('adding a vector to a vector to add each coordinate', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(3, 6, 9);

    const sum = vec1.add(vec2);

    expect(sum).toBe(vec1);
    expect(sum).toBeInstanceOf(Vector);

    expect(sum.x).toBe(4);
    expect(sum.y).toBe(8);
    expect(sum.z).toBe(12);
    expect(sum.w).toBe(0);

    expect(vec1.x).toBe(4);
    expect(vec1.y).toBe(8);
    expect(vec1.z).toBe(12);
    expect(vec1.w).toBe(0);
});

test('subtracting a vector from a vector to subtract each coordinate', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(3, 6, 9);

    const diff = vec1.sub(vec2);

    expect(diff).toBe(vec1);
    expect(diff).toBeInstanceOf(Vector);

    expect(diff.x).toBe(-2);
    expect(diff.y).toBe(-4);
    expect(diff.z).toBe(-6);
    expect(diff.w).toBe(0);

    expect(vec1.x).toBe(-2);
    expect(vec1.y).toBe(-4);
    expect(vec1.z).toBe(-6);
    expect(vec1.w).toBe(0);
});

test('negates the coordinates', () => {
    const vec = new Vector(2, 3, 4);
    const negated = vec.negate();

    expect(negated).toBe(vec);
    expect(negated).toBeInstanceOf(Vector);

    expect(negated.x).toBe(-2);
    expect(negated.y).toBe(-3);
    expect(negated.z).toBe(-4);
    expect(negated.w).toBe(-0);

    expect(vec.x).toBe(-2);
    expect(vec.y).toBe(-3);
    expect(vec.z).toBe(-4);
    expect(vec.w).toBe(-0);
});

test('multiply a vector by a scalar', () => {
    const vec = new Vector(1, -2, 3);
    const product = vec.mulScalar(3.5);

    expect(product).toBe(vec);
    expect(product).toBeInstanceOf(Vector);

    expect(product.x).toBe(3.5);
    expect(product.y).toBe(-7);
    expect(product.z).toBe(10.5);
    expect(product.w).toBe(0);

    expect(vec.x).toBe(3.5);
    expect(vec.y).toBe(-7);
    expect(vec.z).toBe(10.5);
    expect(vec.w).toBe(0);
});

test('multiply a vector by a fraction', () => {
    const vec = new Vector(1, -2, 3);
    const product = vec.mulScalar(0.5);

    expect(product).toBe(vec);
    expect(product).toBeInstanceOf(Vector);

    expect(product.x).toBe(0.5);
    expect(product.y).toBe(-1);
    expect(product.z).toBe(1.5);
    expect(product.w).toBe(0);

    expect(vec.x).toBe(0.5);
    expect(vec.y).toBe(-1);
    expect(vec.z).toBe(1.5);
    expect(vec.w).toBe(0);
});

test('calculate the norm of a vector', () => {
    const vec0 = new Vector(0, 0, 0);
    expect(vec0.norm()).toBe(0);

    const vec1 = new Vector(1, 0, 0);
    expect(vec1.norm()).toBe(1);

    const vec2 = new Vector(0, 1, 0);
    expect(vec2.norm()).toBe(1);

    const vec3 = new Vector(0, 0, 1);
    expect(vec3.norm()).toBe(1);

    const vec4 = new Vector(1, 2, 3);
    expect(vec4.norm()).toBeCloseTo(Math.sqrt(14));

    const vec5 = new Vector(-1, -2, -3);
    expect(vec5.norm()).toBeCloseTo(Math.sqrt(14));
});

test('normalize a vector', () => {
    const vec0 = new Vector(4, 0, 0);
    const normalized0 = vec0.normalize();

    expect(normalized0).toBe(vec0);
    expect(normalized0).toBeInstanceOf(Vector);
    expect(normalized0.norm()).toBe(1);

    expect(vec0.x).toBe(1);
    expect(vec0.y).toBe(0);
    expect(vec0.z).toBe(0);
    expect(vec0.w).toBe(0);

    const vec1 = new Vector(1, 2, 3);
    const normalized1 = vec1.normalize();

    expect(normalized1).toBe(vec1);
    expect(normalized1).toBeInstanceOf(Vector);

    expect(vec1.x).toBe(1 / Math.sqrt(14));
    expect(vec1.y).toBe(2 / Math.sqrt(14));
    expect(vec1.z).toBe(3 / Math.sqrt(14));
    expect(vec1.w).toBe(0 / Math.sqrt(14));

});

test('norm of a normalized vector', () => {
    const vec0 = new Vector(1, 2, 3);
    const normalized0 = vec0.normalize();

    expect(normalized0).toBe(vec0);
    expect(normalized0).toBeInstanceOf(Vector);

    expect(vec0.norm()).toBe(1);
    expect(normalized0.norm()).toBe(1);
});

test('dot product of two vectors', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);
    const dot = vec1.dot(vec2);

    expect(dot).toBe(20);
});

test('cloning a vector', () => {
    const vec = new Vector(1, -2, 3);
    const clone = vec.clone();

    expect(clone).not.toBe(vec);
    expect(clone).toBeInstanceOf(Vector);

    expect(clone.x).toBe(1);
    expect(clone.y).toBe(-2);
    expect(clone.z).toBe(3);
    expect(clone.w).toBe(0);
});

test('cross product of two vectors', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);

    const cross12 = vec1.clone().cross(vec2);
    expect(cross12).toBeInstanceOf(Vector);
    expect(cross12.x).toBe(-1);
    expect(cross12.y).toBe(2);
    expect(cross12.z).toBe(-1);
    expect(cross12.w).toBe(0);

    const cross21 = vec2.clone().cross(vec1);
    expect(cross21).toBeInstanceOf(Vector);
    expect(cross21.x).toBe(1);
    expect(cross21.y).toBe(-2);
    expect(cross21.z).toBe(1);
    expect(cross21.w).toBe(0);

    expect(vec1.x).toBe(1);
    expect(vec1.y).toBe(2);
    expect(vec1.z).toBe(3);
    expect(vec1.w).toBe(0);

    expect(vec2.x).toBe(2);
    expect(vec2.y).toBe(3);
    expect(vec2.z).toBe(4);
    expect(vec2.w).toBe(0);
});

test('multiply a point by a matrix', () => {
    const vector = new Vector(1, 2, 3);
    const matrix = new Matrix4()
        .fromArray([
            1, 2, 3, 4,
            2, 4, 4, 2,
            -3, -2, -1, 1,
            -1, 2, 0, 1,
        ]);
    const multiplied = vector.mulMatrix4(matrix);

    expect(multiplied).toBe(vector);
    expect(multiplied).toBeInstanceOf(Vector);

    expect(vector.x).toBe(14);
    expect(vector.y).toBe(22);
    expect(vector.z).toBe(-10);
    expect(vector.w).toBe(3);
});

test('multiply a point by a matrix with no side effects', () => {
    const vector = new Vector(1, 2, 3);
    const matrix = new Matrix4()
        .fromArray([
            1, 2, 3, 4,
            2, 4, 4, 2,
            -3, -2, -1, 1,
            -1, 2, 0, 1,
        ]);
    vector.mulMatrix4(matrix);

    expect(matrix.entries).toBeInstanceOf(Array);
    expectMatrixToBe(
        matrix.entries,
        [
            1, 2, 3, 4,
            2, 4, 4, 2,
            -3, -2, -1, 1,
            -1, 2, 0, 1,
        ]);
});

test('equals when same', () => {
    const vector1 = new Vector(2, -3, 1);
    const vector2 = new Vector(2, -3, 1);

    expect(vector1.equals(vector1)).toBe(true);
    expect(vector2.equals(vector2)).toBe(true);
    expect(vector1.equals(vector2)).toBe(true);
    expect(vector2.equals(vector1)).toBe(true);
});

test('does not equal when different', () => {
    const vector1 = new Vector(2, -3, 1);
    const vector2 = new Vector(2, -3.0001, 1);

    expect(vector1.equals(vector2)).toBe(false);
    expect(vector2.equals(vector1)).toBe(false);
});

test('translation does not affect vectors', () => {
    const vector = new Vector(-3, 4, 5);
    const translation = new Matrix4()
        .fromTranslation(5, -3, 2);

    vector.mulMatrix4(translation);

    expect(vector.x).toBe(-3);
    expect(vector.y).toBe(4);
    expect(vector.z).toBe(5);
    expect(vector.w).toBe(0);
});

test('multiply by a scaling matrix', () => {
    const vector = new Vector(-2, 1, -10);
    const scaling = new Matrix4()
        .fromScale(2, 3, -3);

    vector.mulMatrix4(scaling);

    expect(vector.x).toBe(-4);
    expect(vector.y).toBe(3);
    expect(vector.z).toBe(30);
    expect(vector.w).toBe(0);
});

test('reflecting vector should not have side effects', () => {
    const vector = new Vector(3, -1, -5);
    const normal = new Vector(0, 1, 2);

    vector.reflect(normal);

    expect(normal.x).toBe(0);
    expect(normal.y).toBe(1);
    expect(normal.z).toBe(2);
});

test('reflecting vector return the vector', () => {
    const vector = new Vector(1, -1, 0);
    const normal = new Vector(0, 1, 0);

    const reflected = vector.reflect(normal);

    expect(reflected).toBeInstanceOf(Vector);
    expect(reflected).toBe(vector);
});

test('reflecting vector approaching at 45 deg', () => {
    const vector = new Vector(1, -1, 0);
    const normal = new Vector(0, 1, 0);

    vector.reflect(normal);

    expect(vector.x).toBe(1);
    expect(vector.y).toBe(1);
    expect(vector.z).toBe(0);
    expect(vector.w).toBe(0);
});

test('reflecting vector off a slanted surface', () => {
    const vector = new Vector(0, -1, 0);
    const normal = new Vector(
        Math.sqrt(2) / 2,
        Math.sqrt(2) / 2,
        0);

    vector.reflect(normal);

    expect(vector.x).toBeCloseTo(1);
    expect(vector.y).toBeCloseTo(0);
    expect(vector.z).toBeCloseTo(0);
    expect(vector.w).toBeCloseTo(0);
});
