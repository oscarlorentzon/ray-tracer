import { PhongMaterial } from "../../src/material/PhongMaterial.js";
import { SceneObject } from "../../src/objects/SceneObject.js";
import { Sphere } from "../../src/objects/Sphere.js";
import { Intersection } from "../../src/trace/Intersection.js";

test('creates intersection', () => {
    const sphere = new Sphere(new PhongMaterial());
    const intersection = new Intersection(1, sphere);
    expect(intersection).toBeDefined();
    expect(intersection).toBeInstanceOf(Intersection);
});

test('sets t and object', () => {
    const sphere = new Sphere(new PhongMaterial());
    const intersection = new Intersection(1, sphere);

    expect(intersection.t).toBe(1);
    expect(intersection.object).toBeDefined();
    expect(intersection.object).toBeInstanceOf(SceneObject);
    expect(intersection.object.uuid).toBe(sphere.uuid);
    expect(intersection.object).toBe(sphere);
});
