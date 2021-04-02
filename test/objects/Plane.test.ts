import { PhongMaterial } from '../../src/material/PhongMaterial.js';
import { Matrix4 } from '../../src/math/Matrix4.js';
import { Point } from '../../src/math/Point.js';
import { Vector } from '../../src/math/Vector.js';
import { Plane } from '../../src/objects/Plane.js';
import { Ray } from '../../src/trace/Ray.js';

test('creates plane', () => {
    const plane = new Plane(new PhongMaterial());
    expect(plane).toBeDefined();
    expect(plane).toBeInstanceOf(Plane);
});

test('creates sphere with identity object to world transform', () => {
    const plane = new Plane(new PhongMaterial());
    const identity = new Matrix4().toArray();
    expect(plane.objectToWorld.toArray()).toEqual(identity);
    expect(plane.objectToWorldInverse.toArray()).toEqual(identity);
});

test('the normal of a plane is constant everywhere', () => {
    const plane = new Plane(new PhongMaterial());
    const normal1 = plane.getNormal(new Point(0, 0, 0));
    const normal2 = plane.getNormal(new Point(10, 0, -10));
    const normal3 = plane.getNormal(new Point(-5, 0, 150));

    expect(normal1.toArray()).toEqual([0, 1, 0, 0]);
    expect(normal2.toArray()).toEqual([0, 1, 0, 0]);
    expect(normal3.toArray()).toEqual([0, 1, 0, 0]);
});

test('intersect with a ray parallel to the plane', () => {
    const plane = new Plane(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 10, 0),
        new Vector(0, 0, 1));

    const ts = plane.intersect(ray);

    expect(ts.length).toBe(0);
});

test('intersect with coplanar ray', () => {
    const plane = new Plane(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 0, 0),
        new Vector(0, 0, 1));

    const ts = plane.intersect(ray);

    expect(ts.length).toBe(0);
});

test('intersect from above', () => {
    const plane = new Plane(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 1, 0),
        new Vector(0, -1, 0));

    const ts = plane.intersect(ray);

    expect(ts.length).toBe(1);
    expect(ts[0]).toBe(1);
});

test('intersect from below', () => {
    const plane = new Plane(new PhongMaterial());
    const ray = new Ray(
        new Point(0, -1, 0),
        new Vector(0, 1, 0));

    const ts = plane.intersect(ray);

    expect(ts.length).toBe(1);
    expect(ts[0]).toBe(1);
});
