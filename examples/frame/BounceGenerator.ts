import {
    Matrix4,
    Plane,
    Point,
    Sphere,
    Vector,
} from "../../src/ray-tracer.js";
import { FrameGenerator } from "./Frame.js";

type BouncingSphere = {
    sphere: Sphere;
    velocity: number;
};

export const GRAVITY = -9.806;

function distanceToPlane(sphere: Sphere, plane: Plane): number {
    const planeY = plane.objectToWorld.entries[7];

    const entries = sphere.objectToWorld.entries;
    const positionY = entries[7];
    const scaleY = entries[5];
    const surfaceY = positionY - scaleY;

    const distanceToPlane = surfaceY - planeY;
    return distanceToPlane;
}


export function distanceFromTime(
    t: number,
    velocity: number,
    acceleration: number): number {
    return velocity * t + acceleration * t * t / 2;
}

export function hitTime(
    displacement: number,
    velocity: number,
    acceleration: number): number {
    const a = acceleration / 2;
    const b = velocity;
    const c = -displacement;
    const s = Math.sqrt(b * b - 4 * a * c);
    const d = 2 * a;
    const t1 = -(b - s) / d;
    const t2 = -(b + s) / d;
    return t1 > 0 ? t1 : t2;
}

export function bouncer(
    spheres: Array<Sphere>,
    plane: Plane,
    fps: number): FrameGenerator<void> {
    const bouncingSpheres: Array<BouncingSphere> =
        spheres
            .map(sphere => {
                return { sphere, velocity: 0 };
            });

    return () => {
        const dt = 1 / fps;
        for (const b of bouncingSpheres) {
            const sphere = b.sphere;
            let displacement = 0;
            if (b.velocity > 0) {
                b.velocity += GRAVITY * dt;
                displacement = b.velocity * dt;
            } else {
                const distance = distanceToPlane(sphere, plane);
                if (Math.abs(b.velocity * dt) > distance) {
                    const dtDown = -distance / b.velocity;
                    const dtUp = dt - dtDown;
                    displacement = b.velocity * dtDown - b.velocity * dtUp;
                    b.velocity += GRAVITY * dtDown;
                    b.velocity *= -1;
                    b.velocity += GRAVITY * dtUp;
                } else {
                    displacement = b.velocity * dt;
                    b.velocity += GRAVITY * dt;
                }
            }

            const translation = new Matrix4()
                .fromTranslation(0, displacement, 0);
            const transform = sphere.objectToWorld
                .clone()
                .mul(translation);
            sphere.setObjectToWorld(transform);
        }
    };
}
