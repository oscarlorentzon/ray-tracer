import {
    Color,
    Matrix4,
    Point,
    PointLight,
} from "../../src/ray-tracer.js";
import { FrameGenerator } from "./Frame.js";

export function dayArc(
    nightPosition: Point,
    origin: Point): FrameGenerator<PointLight> {
    const light = new PointLight(
        new Point(0, 0, 0),
        new Color(0, 0, 0));

    const rotation = new Matrix4();
    const direction = nightPosition
        .sub(origin);

    const setPosition = (i: number): void => {
        rotation.fromRotationZ(-i * 2 * Math.PI);
        const position = direction
            .clone()
            .mulMatrix4(rotation);
        light.position.x = position.x;
        light.position.y = position.y;
        light.position.z = position.z;
    };

    const setIntensity = (i: number): void => {
        const top = 1 / 2;
        const intensity = -2 * (Math.abs(i - top) - top);
        light.intensity.r = intensity;
        light.intensity.g = intensity;
        light.intensity.b = intensity;
    };

    return (frame, frames) => {
        const i = frame / frames;
        setPosition(i);
        setIntensity(i);
        return light;
    };
}
