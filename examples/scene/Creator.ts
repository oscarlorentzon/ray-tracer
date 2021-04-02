import {
    Color,
    Matrix4,
    Pattern,
    PhongMaterial,
    PhongMaterialParameters,
    Plane,
    Point,
    PointLight,
    Sphere,
} from '../../src/ray-tracer.js';

export function sphere(
    materialParameters: PhongMaterialParameters,
    transform: Matrix4): Sphere {
    const material = new PhongMaterial(materialParameters);
    const sphere = new Sphere(material);
    sphere.setObjectToWorld(transform);
    return sphere;
}

export function pointLight(
    position: Point,
    intensity: number): PointLight {
    return new PointLight(
        position,
        new Color(intensity, intensity, intensity));
}

export function plane(
    materialParameters: PhongMaterialParameters,
    pattern: Pattern,
    transform: Matrix4): Plane {
    materialParameters = Object.assign(
        {},
        materialParameters,
        { pattern });
    const material = new PhongMaterial(materialParameters);
    const plane = new Plane(material);
    plane.setObjectToWorld(transform);
    return plane;
}
