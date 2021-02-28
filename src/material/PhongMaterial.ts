import { Point } from "../math/Point.js";
import { Color } from "../paint/Color.js";

export class PhongMaterial {
    public readonly color: Color;

    public ambient: number;
    public diffuse: number;
    public shininess: number;
    public specular: number;

    constructor() {
        this.color = new Color(1, 1, 1);
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.shininess = 50;
        this.specular = 0.9;
    }
}
