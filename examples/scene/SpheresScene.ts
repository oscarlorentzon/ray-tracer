import {
    Color,
    Matrix4,
    Point,
    Scene,
    SolidPattern,
} from '../../src/ray-tracer.js';
import * as Create from './Creator.js';

export function create(): Scene {
    const spheres = [
        Create.sphere(
            {
                shininess: 100,
                pattern: new SolidPattern(new Color(1, 1, 0)),
            },
            new Matrix4().fromTranslation(-1, 0, 0.5)),
        Create.sphere(
            {
                shininess: 20,
                pattern: new SolidPattern(new Color(1, 0, 1)),
            },
            new Matrix4().fromTranslation(0.5, 0, -1)),
        Create.sphere(
            {
                shininess: 300,
                pattern: new SolidPattern(new Color(0, 1, 1)),
            },
            new Matrix4().fromTranslation(2, 0, -3)),
    ];

    const lights = [
        Create.pointLight(new Point(-3, 0, 10), 0.5),
        Create.pointLight(new Point(-13, 10, 10), 0.3),
        Create.pointLight(new Point(3, 10, -10), 0.2),
    ];

    const scene = new Scene();
    scene.objects.push(...spheres);
    scene.ligths.push(...lights);
    return scene;
}
