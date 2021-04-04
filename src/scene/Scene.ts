import { PointLight } from '../light/PointLight.js';
import { SceneObject } from '../objects/SceneObject.js';

export class Scene {
    public readonly ligths: Array<PointLight>;
    public readonly objects: Array<SceneObject>;

    constructor() {
        this.ligths = [];
        this.objects = [];
    }

    public clear(): void {
        this.ligths.length = 0;
        this.objects.length = 0;
    }
}
