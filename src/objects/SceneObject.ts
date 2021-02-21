import { Ray } from "../trace/Ray.js";
import { generateUUID } from "../util/Crypto.js";

export abstract class SceneObject {
    public readonly uuid;
    constructor() { this.uuid = generateUUID(); }
    abstract intersect(r: Ray): Array<number>;
}
