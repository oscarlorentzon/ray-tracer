import { Color } from '../../src/ray-tracer.js';
import { hsvToRgb } from '../util/ColorConversion.js';
import { FrameGenerator } from './Frame.js';

export const lightnessIncreaser: FrameGenerator<Color> =
    (frame, frames) => {
        const r = frame / frames;
        const color = new Color(r, 0, 0);
        return color;
    };

export const lightnessDecreaser: FrameGenerator<Color> =
    (frame, frames) => {
        const r = (frames - frame) / frames;
        const color = new Color(r, 0, 0);
        return color;
    };

export const hueRotator: FrameGenerator<Color> =
    (frame, frames) => {
        const c = frame / frames;
        const hue = 2 * Math.PI * c;
        const saturation = 1;
        const value = 1;
        const color = hsvToRgb(hue, saturation, value);
        return color;
    };
