import { Color } from '../paint/Color.js';
import { SolidPattern } from '../pattern/SolidPattern.js';
export class PhongMaterial {
    constructor(parameters) {
        this.pattern = new SolidPattern(new Color(1, 1, 1));
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.shininess = 200;
        this.specular = 0.9;
        if (parameters) {
            Object.assign(this, parameters);
        }
    }
    lighting(light, position, eye, normal, occluded, objectToWorldInverse) {
        const self = this;
        const objectPosition = position
            .clone()
            .mulMatrix4(objectToWorldInverse);
        const effectiveColor = self.pattern
            .getColor(objectPosition)
            .schur(light.intensity);
        const lightVector = light.position
            .clone()
            .sub(position)
            .normalize();
        const ambient = effectiveColor
            .clone()
            .mulScalar(self.ambient);
        const normalLightAngle = normal
            .clone()
            .dot(lightVector);
        if (occluded || normalLightAngle < 0) {
            return ambient;
        }
        const diffuse = effectiveColor
            .clone()
            .mulScalar(self.diffuse * normalLightAngle);
        const reflectionEyeAngle = eye
            .clone()
            .dot(lightVector
            .clone()
            .mulScalar(-1)
            .reflect(normal));
        if (reflectionEyeAngle < 0) {
            return ambient.add(diffuse);
        }
        const specular = light.intensity
            .clone()
            .mulScalar(self.specular * Math.pow(reflectionEyeAngle, self.shininess));
        return ambient
            .add(diffuse)
            .add(specular);
    }
}
//# sourceMappingURL=PhongMaterial.js.map