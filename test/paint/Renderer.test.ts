import { PointLight } from "../../src/light/PointLight.js";
import { PhongMaterial } from "../../src/material/PhongMaterial.js";
import { Matrix4 } from "../../src/math/Matrix4.js";
import { Point } from "../../src/math/Point.js";
import { Vector } from "../../src/math/Vector.js";
import { Sphere } from "../../src/objects/Sphere.js";
import { Color } from "../../src/paint/Color.js";
import { Renderer } from "../../src/paint/Renderer.js";
import { Scene } from "../../src/scene/Scene.js";
import { Ray } from "../../src/trace/Ray.js";
import { RayTracer } from "../../src/trace/RayTracer.js";

test('creates renderer', () => {
    const renderer = new Renderer();
    expect(renderer).toBeDefined();
    expect(renderer).toBeInstanceOf(Renderer);
});

test('render returns a color', () => {
    const renderer = new Renderer();
    const scene = new Scene();
    const raytracer = new RayTracer(
        new Ray(new Point(0, 0, 5), new Vector(0, 0, -1)));

    const color = renderer.renderPixel(scene, raytracer);

    expect(color).toBeDefined();
    expect(color).toBeInstanceOf(Color);
});

test('renders the clear color for empty scene', () => {
    const renderer = new Renderer();
    const scene = new Scene();
    const raytracer = new RayTracer(
        new Ray(new Point(0, 0, 5), new Vector(0, 0, -1)));

    const color = renderer.renderPixel(scene, raytracer);

    expect(color.r).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
});

describe('render a scene', () => {
    let scene: Scene = null;
    beforeEach(() => {
        const pointLight = new PointLight(
            new Point(-10, 10, 10),
            new Color(1, 1, 1));

        const material1 = new PhongMaterial();
        material1.color.fromArray([0.8, 1.0, 0.6]);
        material1.diffuse = 0.7;
        material1.specular = 0.2;
        const sphere1 = new Sphere(material1);

        const material2 = new PhongMaterial();
        const sphere2 = new Sphere(material2);
        sphere2.setObjectToWorld(new Matrix4().fromScale(0.5, 0.5, 0.5));

        scene = new Scene();
        scene.ligths.push(pointLight);
        scene.objects.push(...[sphere1, sphere2]);
    });

    test('intersect default world objects', () => {
        const ray = new Ray(
            new Point(0, 0, 5),
            new Vector(0, 0, -1));
        const raytracer = new RayTracer(ray);
        const intersections = raytracer.intersect(scene.objects);

        expect(intersections.length).toBe(4);
        expect(intersections[0].t).toBe(4);
        expect(intersections[1].t).toBe(4.5);
        expect(intersections[2].t).toBe(5.5);
        expect(intersections[3].t).toBe(6);
    });

    test('render an intersection', () => {
        const ray = new Ray(
            new Point(0, 0, 5),
            new Vector(0, 0, -1));
        const raytracer = new RayTracer(ray);
        const renderer = new Renderer();
        const color = renderer.renderPixel(scene, raytracer);

        expect(color.r).toBeCloseTo(0.38066);
        expect(color.g).toBeCloseTo(0.47583);
        expect(color.b).toBeCloseTo(0.2855);
    });

    test('render an intersection from the inside', () => {
        scene.ligths.pop();
        scene.ligths.push(
            new PointLight(
                new Point(0, 0.25, 0),
                new Color(1, 1, 1)));
        const ray = new Ray(
            new Point(0, 0, 0),
            new Vector(0, 0, -1));
        const raytracer = new RayTracer(ray);
        const renderer = new Renderer();
        const color = renderer.renderPixel(scene, raytracer);

        expect(color.r).toBeCloseTo(0.90498);
        expect(color.g).toBeCloseTo(0.90498);
        expect(color.b).toBeCloseTo(0.90498);
    });

    test('render with an intersection behind the raytracer origin', () => {
        const sphere1 = scene.objects[0];
        sphere1.material.ambient = 1;
        sphere1.material.diffuse = 0;
        sphere1.material.specular = 0;

        const sphere2 = scene.objects[1];
        sphere2.material.ambient = 1;
        sphere2.material.diffuse = 0;
        sphere2.material.specular = 0;

        const ray = new Ray(
            new Point(0, 0, 0.75),
            new Vector(0, 0, -1));
        const raytracer = new RayTracer(ray);
        const renderer = new Renderer();

        const color = renderer.renderPixel(scene, raytracer);

        expect(color.r).toBe(sphere2.material.color.r);
        expect(color.g).toBe(sphere2.material.color.g);
        expect(color.b).toBe(sphere2.material.color.b);
    });
});
