import { PhongMaterial } from "../material/PhongMaterial.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Point } from "../math/Point.js";
import { Vector } from "../math/Vector.js";
import { Ray } from "../trace/Ray.js";
import { generateUUID } from "../util/Crypto.js";

export abstract class SceneObject {
    /**
     * Model matrix (object space to world space
     * transform).
     */
    public readonly objectToWorld;

    /**
     * Inverse model matrix (world space to object
     * space transform).
     */
    public readonly objectToWorldInverse;
    public readonly uuid;
    constructor(public readonly material: PhongMaterial) {
        this.objectToWorld = new Matrix4();
        this.objectToWorldInverse = new Matrix4();
        this.uuid = generateUUID();
    }

    abstract getNormal(p: Point): Vector;
    abstract intersect(r: Ray): Array<number>;

    /**
     * Set the object to world transform and update
     * the inverse.
     * @param m Model matrix.
     */
    setObjectToWorld(m: Matrix4): void {
        const t = this;
        const a = m
            .toArray();
        t.objectToWorld
            .fromArray(a);
        t.objectToWorldInverse
            .fromArray(a)
            .invert();
    }
}
