import {
    Common,
    Interpolation,
} from '../../src/ray-tracer.js';
import { FrameGenerator } from './Frame.js';

const clamp = Common.clamp;
const inverseLerp = Interpolation.inverseLerp;

export type Wave = {
    blend: number;
    waveScale: number;
}

export function waveGenerator(
    delayFrames: number,
    initialScale: number,
    scaleFactor: number): FrameGenerator<Wave> {
    let waveScale = initialScale;
    let blend = 0;
    const cutoff = 5;
    return (frame, frames) => {
        if (frame <= delayFrames) {
            return { blend, waveScale };
        }

        waveScale *= scaleFactor;
        waveScale = clamp(waveScale, 0, 2000);

        if (frame < frames - cutoff) {
            const t = clamp(inverseLerp(delayFrames, frames - 5, frame), 0, 1);
            blend = clamp(t * 5, 0, 1);
        } else {
            const t = clamp(inverseLerp(frames, frames - 5, frame), 0, 1);
            blend = clamp(t, 0, 1);
        }

        return { blend, waveScale };
    };
}
