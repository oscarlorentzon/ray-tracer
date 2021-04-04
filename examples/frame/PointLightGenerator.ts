import {
    Color,
    Interpolation,
    Matrix4,
    Point,
    PointLight,
} from '../../src/ray-tracer.js';
import { hsvToRgb } from '../util/ColorConversion.js';
import { FrameGenerator } from './Frame.js';

const lerp = Interpolation.lerp;
const smoothStep = Interpolation.smoothStep;
const smoothStepN = Interpolation.smoothStepN;

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

    const yellow = Math.PI / 3;
    const rose = -Math.PI / 6;

    const setColor = (i: number): void => {
        const smoothI = smoothStepN(4, 0, 1, i);
        const hue = lerp(yellow, rose, smoothI);
        const color = hsvToRgb(hue, 1, 1);
        light.intensity.r = color.r;
        light.intensity.g = color.g;
        light.intensity.b = color.b;
    };

    const applyIntensity = (i: number): void => {
        const smoothI = smoothStep(0, 1, i);
        const top = 1 / 2;
        const intensity = -2 * (Math.abs(smoothI - top) - top);
        light.intensity.mulScalar(intensity);
    };

    return (frame, frames) => {
        const i = frame / frames;
        setPosition(i);
        setColor(i);
        applyIntensity(i);
        return light;
    };
}
