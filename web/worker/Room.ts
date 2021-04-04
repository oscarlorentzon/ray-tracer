import {
    Color,
    Matrix4,
    PhongMaterial,
    Plane,
    Point,
    PointLight,
    Ray,
    RayTracer,
    Renderer,
    Scene,
    SceneObject,
    Sphere,
    Vector,
} from '../../src/ray-tracer.js';
import { ObjectContract } from '../contracts/Contract.js';

export class Room {
    public readonly raytracer: RayTracer;
    public readonly renderer: Renderer;
    public readonly scene: Scene;

    private readonly _lights: Array<PointLight>;
    private readonly _planes: Array<SceneObject>;
    private readonly _objects: Array<SceneObject>;

    constructor() {
        this._lights = [this._createLight()];
        this._planes = [this._createFloor(), ...this._createWalls()];
        this._objects = [];

        this.raytracer = new RayTracer(
            new Ray(
                new Point(0, 0, 0),
                new Vector(0, 0, -1)));
        this.renderer = new Renderer();
        this.scene = new Scene();
    }

    public populate(): void {
        this.scene.clear();
        this.scene.ligths.push(...this._lights);
        this.scene.objects.push(...this._planes);
        this.scene.objects.push(...this._objects);
    }

    public resetObjects(objects: Array<ObjectContract>): void {
        this._objects.length = 0;
        for (const object of objects) {
            if (object.type === 'sphere') {
                const position = object.instance.position;
                const sphere = new Sphere(new PhongMaterial());
                sphere.setObjectToWorld(
                    new Matrix4().fromTranslation(position.x, 1, position.y));
                this._objects.push(sphere);
            }
        }
    }

    private _createFloor(): SceneObject {
        return new Plane(new PhongMaterial());
    }

    private _createLight(): PointLight {
        return new PointLight(
            new Point(30, 30, 20),
            new Color(1, 1, 1));
    }

    private _createWalls(): Array<SceneObject> {
        const wallX = new Plane(new PhongMaterial());
        wallX.setObjectToWorld(new Matrix4().fromRotationX(Math.PI / 2));
        const wallZ = new Plane(new PhongMaterial());
        wallZ.setObjectToWorld(new Matrix4().fromRotationZ(-Math.PI / 2));
        return [wallX, wallZ];
    }
}
