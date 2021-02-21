import { SceneObject } from "../objects/SceneObject.js";

export class Intersection {
    constructor(
        public readonly t: number,
        public readonly object: SceneObject) { }
}
