import { Point } from "../../src/math/Point";
import { Vector } from "../../src/math/Vector";
import { Sphere } from "../../src/objects/Sphere";
import { Ray } from "../../src/trace/Ray";
import { RayTracer } from "../../src/trace/RayTracer";

test('creates raytracer', () => {
    const ray = new Ray(
        new Point(0, 0, 0),
        new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    expect(rayTracer).toBeDefined();
    expect(rayTracer).toBeInstanceOf(RayTracer);
});

test('ray tracer intersects one sphere', () => {
    const sphere = new Sphere();
    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const intersections = rayTracer.intersect([sphere]);

    expect(intersections.length).toBe(2);
    const i0 = intersections[0];
    expect(i0.t).toBeCloseTo(4);
    expect(i0.object.uuid).toBe(sphere.uuid);
    const i1 = intersections[1];
    expect(i1.t).toBeCloseTo(6);
    expect(i1.object.uuid).toBe(sphere.uuid);
});

test('ray tracer intersects two spheres', () => {
    const sphere1 = new Sphere();
    const sphere2 = new Sphere();
    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const intersections = rayTracer.intersect([sphere1, sphere2]);

    expect(intersections.length).toBe(4);
    const uuids = new Set(
        intersections
            .map(i => i.object.uuid));

    expect(uuids.size).toBe(2);
    expect(uuids.has(sphere1.uuid)).toBe(true);
    expect(uuids.has(sphere2.uuid)).toBe(true);
});
