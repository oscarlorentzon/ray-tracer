import { PointLight } from '../light/PointLight.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Point } from '../math/Point.js';
import { Vector } from '../math/Vector.js';
import { Color } from '../paint/Color.js';
import { Pattern } from '../pattern/Pattern.js';
import { SolidPattern } from '../pattern/SolidPattern.js';

export type PhongMaterialParameters = {
    [K in keyof PhongMaterial]?: PhongMaterial[K];
};

export class PhongMaterial {
    public readonly pattern: Pattern;
    public ambient: number;
    public diffuse: number;
    public shininess: number;
    public specular: number;

    constructor(parameters?: PhongMaterialParameters) {
        this.pattern = new SolidPattern(new Color(1, 1, 1));
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.shininess = 200;
        this.specular = 0.9;

        if (!!parameters) { Object.assign(this, parameters); }
    }

    lighting(
        light: PointLight,
        position: Point,
        eye: Vector,
        normal: Vector,
        occluded: boolean,
        objectToWorldInverse: Matrix4): Color {
        const t = this;
        const objectPosition = position
            .clone()
            .mulMatrix4(objectToWorldInverse)
        const effectiveColor = t.pattern
            .getColor(objectPosition)
            .schur(light.intensity);

        const lightVector = light.position
            .clone()
            .sub(position)
            .normalize();

        const ambient = effectiveColor
            .clone()
            .mulScalar(t.ambient);

        const normalLightAngle = normal
            .clone()
            .dot(lightVector);

        if (occluded || normalLightAngle < 0) { return ambient; }

        const diffuse = effectiveColor
            .clone()
            .mulScalar(t.diffuse * normalLightAngle);

        const reflectionEyeAngle = eye
            .clone()
            .dot(
                lightVector
                    .clone()
                    .mulScalar(-1)
                    .reflect(normal));

        if (reflectionEyeAngle < 0) { return ambient.add(diffuse); }

        const specular = light.intensity
            .clone()
            .mulScalar(
                t.specular * Math.pow(reflectionEyeAngle, t.shininess));

        return ambient
            .add(diffuse)
            .add(specular);
    }
}
