import { Matrix4 } from '../math/Matrix4.js';
import { generateUUID } from '../util/Crypto.js';
export class SceneObject {
    constructor(material) {
        this.material = material;
        this.objectToWorld = new Matrix4();
        this.objectToWorldInverse = new Matrix4();
        this.uuid = generateUUID();
    }
    lighting(light, position, eye, normal, occluded) {
        const self = this;
        return self.material.lighting(light, position, eye, normal, occluded, self.objectToWorldInverse);
    }
    /**
     * Set the object to world transform and update
     * the inverse.
     * @param m Model matrix.
     */
    setObjectToWorld(m) {
        const self = this;
        const a = m
            .toArray();
        self.objectToWorld
            .fromArray(a);
        self.objectToWorldInverse
            .fromArray(a)
            .invert();
        return self;
    }
}
//# sourceMappingURL=SceneObject.js.map