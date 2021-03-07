import { PhongMaterial } from "../../src/material/PhongMaterial";
import { Point } from "../../src/math/Point";
import { Vector } from "../../src/math/Vector";
import { Sphere } from "../../src/objects/Sphere";
import { Matrix4 } from "../../src/ray-tracer";
import { Intersection } from "../../src/trace/Intersection";
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
    const sphere = new Sphere(new PhongMaterial());
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
    const sphere1 = new Sphere(new PhongMaterial());
    const sphere2 = new Sphere(new PhongMaterial());
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

test('intersections are sorted in ascending order', () => {
    const sphere1 = new Sphere(new PhongMaterial());
    const sphere2 = new Sphere(new PhongMaterial());
    sphere2.setObjectToWorld(new Matrix4().fromScale(0.5, 0.5, 0.5));
    const ray = new Ray(
        new Point(0, 0, 5),
        new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const intersections = rayTracer.intersect([sphere1, sphere2]);

    expect(intersections.length).toBe(4);
    expect(intersections[0].t).toBe(4);
    expect(intersections[1].t).toBe(4.5);
    expect(intersections[2].t).toBe(5.5);
    expect(intersections[3].t).toBe(6);
});

test('the hit when all intersections have positive t', () => {
    const intersection1 = new Intersection(1, new Sphere(new PhongMaterial()));
    const intersection2 = new Intersection(2, new Sphere(new PhongMaterial()));

    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const hit = rayTracer.hit([intersection1, intersection2]);

    expect(hit).toBe(intersection1);
});

test('the hit when some intersections have negative t', () => {
    const intersection1 = new Intersection(-1, new Sphere(new PhongMaterial()));
    const intersection2 = new Intersection(1, new Sphere(new PhongMaterial()));

    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const hit = rayTracer.hit([intersection2, intersection1]);

    expect(hit).toBe(intersection2);
});

test('the hit when all intersections have negative t', () => {
    const intersection1 = new Intersection(-1, new Sphere(new PhongMaterial()));
    const intersection2 = new Intersection(-2, new Sphere(new PhongMaterial()));

    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const hit = rayTracer.hit([intersection2, intersection1]);

    expect(hit).toBeNull();
});

test('the hit is always the lowest non-negative intersection', () => {
    const intersection1 = new Intersection(-3, new Sphere(new PhongMaterial()));
    const intersection2 = new Intersection(2, new Sphere(new PhongMaterial()));
    const intersection3 = new Intersection(5, new Sphere(new PhongMaterial()));
    const intersection4 = new Intersection(7, new Sphere(new PhongMaterial()));

    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, -1));
    const rayTracer = new RayTracer(ray);

    const hit = rayTracer.hit([
        intersection1,
        intersection2,
        intersection3,
        intersection4,
    ]);

    expect(hit).toBe(intersection2);
});
