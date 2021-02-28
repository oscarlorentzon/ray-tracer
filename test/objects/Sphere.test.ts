import { PhongMaterial } from "../../src/material/PhongMaterial.js";
import { Matrix4 } from "../../src/math/Matrix4.js";
import { Point } from "../../src/math/Point.js";
import { Vector } from "../../src/math/Vector.js";
import { Sphere } from "../../src/objects/Sphere.js";
import { Ray } from "../../src/trace/Ray.js";

test('creates sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    expect(sphere).toBeDefined();
    expect(sphere).toBeInstanceOf(Sphere);
});

test('creates sphere with identity object to world transform', () => {
    const sphere = new Sphere(new PhongMaterial());
    const identity = new Matrix4().toArray();
    expect(sphere.objectToWorld.toArray()).toEqual(identity);
    expect(sphere.objectToWorldInverse.toArray()).toEqual(identity);
});

test('ray intersects sphere at two points', () => {
    const sphere = new Sphere(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(4);
    expect(intersections[1]).toBeCloseTo(6);
});

test('ray intersects sphere at a tangent', () => {
    const sphere = new Sphere(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 1, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(5);
    expect(intersections[1]).toBeCloseTo(5);
});

test('ray misses a sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 2, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(0);
});

test('ray originates inside a sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 0, 0),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(-1);
    expect(intersections[1]).toBeCloseTo(1);
});

test('ray in front of a sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    const ray = new Ray(
        new Point(0, 0, -5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(-6);
    expect(intersections[1]).toBeCloseTo(-4);
});

test('intersect a scaled sphere with a ray', () => {
    const sphere = new Sphere(new PhongMaterial());
    sphere.setObjectToWorld(
        new Matrix4()
            .fromScale(2, 2, 2));

    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(3);
    expect(intersections[1]).toBeCloseTo(7);
});

test('intersect a translated sphere with a ray', () => {
    const sphere = new Sphere(new PhongMaterial());
    sphere.setObjectToWorld(
        new Matrix4()
            .fromTranslation(5, 0, 0));

    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(0);
});

test('the normal is a vector and the point is not modified', () => {
    const sphere = new Sphere(new PhongMaterial());
    const point = new Point(1, 2, 3);
    const normal = sphere.getNormal(point);

    expect(normal).toBeDefined();
    expect(normal).toBeInstanceOf(Vector);

    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(3);
});

test('the normal is normalized', () => {
    const sphere = new Sphere(new PhongMaterial());
    const normal = sphere.getNormal(
        new Point(
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3));

    expect(normal.norm()).toBeCloseTo(1);
});

test('the normal at a point on the x axis', () => {
    const sphere = new Sphere(new PhongMaterial());
    const normal = sphere.getNormal(new Point(1, 0, 0));

    expect(normal.x).toBe(1);
    expect(normal.y).toBe(0);
    expect(normal.z).toBe(0);
});

test('the normal at a point on the y axis', () => {
    const sphere = new Sphere(new PhongMaterial());
    const normal = sphere.getNormal(new Point(0, 1, 0));

    expect(normal.x).toBe(0);
    expect(normal.y).toBe(1);
    expect(normal.z).toBe(0);
});

test('the normal at a point on the z axis', () => {
    const sphere = new Sphere(new PhongMaterial());
    const normal = sphere.getNormal(new Point(0, 0, 1));

    expect(normal.x).toBe(0);
    expect(normal.y).toBe(0);
    expect(normal.z).toBe(1);
});

test('the normal at a nonaxial point', () => {
    const sphere = new Sphere(new PhongMaterial());
    const normal = sphere.getNormal(
        new Point(
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3));

    const expected = Math.sqrt(3) / 3;
    expect(normal.x).toBeCloseTo(expected);
    expect(normal.y).toBeCloseTo(expected);
    expect(normal.z).toBeCloseTo(expected);
});

test('the normal on a translated sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    sphere.setObjectToWorld(new Matrix4().fromTranslation(0, 1, 0));
    const normal = sphere.getNormal(
        new Point(
            0,
            1 + Math.sqrt(2) / 2,
            -Math.sqrt(2) / 2));

    const expected = Math.sqrt(2) / 2;
    expect(normal.x).toBeCloseTo(0);
    expect(normal.y).toBeCloseTo(expected);
    expect(normal.z).toBeCloseTo(-expected);
});

test('the normal on a transformed sphere', () => {
    const sphere = new Sphere(new PhongMaterial());
    const scaling = new Matrix4()
        .fromScale(1, 0.5, 1);
    const transform = new Matrix4()
        .fromRotationZ(Math.PI / 5)
        .mul(scaling);
    sphere.setObjectToWorld(transform);
    const normal = sphere.getNormal(
        new Point(
            0,
            Math.sqrt(2) / 2,
            -Math.sqrt(2) / 2));

    expect(normal.x).toBeCloseTo(0);
    expect(normal.y).toBeCloseTo(0.97014, 5);
    expect(normal.z).toBeCloseTo(-0.24254, 5);
});
