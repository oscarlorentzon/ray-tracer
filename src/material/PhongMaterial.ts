import { PointLight } from "../light/PointLight.js";
import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";
import { Color } from "../paint/Color.js";

export type PhongMaterialParameters = {
    [K in keyof PhongMaterial]?: PhongMaterial[K];
};

export class PhongMaterial {
    public readonly color: Color;
    public ambient: number;
    public diffuse: number;
    public shininess: number;
    public specular: number;

    constructor(parameters?: PhongMaterialParameters) {
        this.color = new Color(1, 1, 1);
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
        occluded: boolean): Color {
        const t = this;
        const effectiveColor = t.color
            .clone()
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
