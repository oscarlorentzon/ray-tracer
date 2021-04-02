import { PointLight } from '../../src/light/PointLight.js';
import { PhongMaterial } from '../../src/material/PhongMaterial.js';
import { Matrix4 } from '../../src/math/Matrix4.js';
import { Point } from '../../src/math/Point.js';
import { Vector } from '../../src/math/Vector.js';
import { Color } from '../../src/paint/Color.js';
import { SolidPattern } from '../../src/pattern/SolidPattern.js';

test('create a phong material', () => {
    const material = new PhongMaterial();

    expect(material).toBeDefined();
    expect(material).toBeInstanceOf(PhongMaterial);
    expect(material.pattern).toBeInstanceOf(SolidPattern);
});

test('create a default material', () => {
    const material = new PhongMaterial();

    const point = new Point(0, 0, 0);
    const color = material.pattern.getColor(point);
    expect(color.r).toBe(1);
    expect(color.g).toBe(1);
    expect(color.b).toBe(1);
    expect(material.ambient).toBe(0.1);
    expect(material.diffuse).toBe(0.9);
    expect(material.shininess).toBe(200);
    expect(material.specular).toBe(0.9);
});

test('lighting with the eye between the light and the surface', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, 0, -1);
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 0, -10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        false,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(1.9);
    expect(lighting.g).toBeCloseTo(1.9);
    expect(lighting.b).toBeCloseTo(1.9);
});

test('lighting with shadow', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, 0, -1);
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 0, -10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        true,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(0.1);
    expect(lighting.g).toBeCloseTo(0.1);
    expect(lighting.b).toBeCloseTo(0.1);
});

test('lighting with eye offset 45 degrees', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, 1, -1)
        .normalize();
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 0, -10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        false,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(1);
    expect(lighting.g).toBeCloseTo(1);
    expect(lighting.b).toBeCloseTo(1);
});

test('lighting with eye opposite surface, light offset 45', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, 0, -1);
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 10, -10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        false,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(0.7364);
    expect(lighting.g).toBeCloseTo(0.7364);
    expect(lighting.b).toBeCloseTo(0.7364);
});

test('lighting with eye in the path of the reflection vector', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, -1, -1)
        .normalize();
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 10, -10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        false,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(1.6364);
    expect(lighting.g).toBeCloseTo(1.6364);
    expect(lighting.b).toBeCloseTo(1.6364);
});

test('lighting with the light behind the surface', () => {
    const material = new PhongMaterial();
    const position = new Point(0, 0, 0);
    const eye = new Vector(0, 0, -1);
    const normal = new Vector(0, 0, -1);
    const light = new PointLight(
        new Point(0, 0, 10),
        new Color(1, 1, 1));

    const lighting = material.lighting(
        light,
        position,
        eye,
        normal,
        false,
        new Matrix4());

    expect(lighting.r).toBeCloseTo(0.1);
    expect(lighting.g).toBeCloseTo(0.1);
    expect(lighting.b).toBeCloseTo(0.1);
});
