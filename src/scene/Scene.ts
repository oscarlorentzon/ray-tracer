import { PointLight } from '../light/PointLight.js';
import { SceneObject } from '../objects/SceneObject.js';

export class Scene {
    public readonly objects: Array<SceneObject>;
    public readonly ligths: Array<PointLight>;

    constructor() {
        this.objects = [];
        this.ligths = [];
    }
}
