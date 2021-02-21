import { Point } from "../../src/math/Point.js";
import { Vector } from "../../src/math/Vector.js";
import { Sphere } from "../../src/objects/Sphere.js";
import { Ray } from "../../src/trace/Ray.js";

test('creates sphere', () => {
    const sphere = new Sphere();
    expect(sphere).toBeDefined();
    expect(sphere).toBeInstanceOf(Sphere);
});

test('creates sphere at origin', () => {
    const sphere = new Sphere();
    expect(sphere.position.x).toBe(0);
    expect(sphere.position.y).toBe(0);
    expect(sphere.position.z).toBe(0);
    expect(sphere.position.w).toBe(1);
});

test('ray intersects sphere at two points', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(4);
    expect(intersections[1]).toBeCloseTo(6);
});

test('ray intersects sphere at a tangent', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 1, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(5);
    expect(intersections[1]).toBeCloseTo(5);
});

test('ray misses a sphere', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 2, 5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(0);
});

test('ray originates inside a sphere', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 0, 0),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(-1);
    expect(intersections[1]).toBeCloseTo(1);
});

test('ray in front of a sphere', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 0, -5),
        new Vector(0, 0, -1));

    const intersections = sphere.intersect(ray);

    expect(intersections.length).toBe(2);
    expect(intersections[0]).toBeCloseTo(-6);
    expect(intersections[1]).toBeCloseTo(-4);
});
