import { Matrix4 } from '../../src/ray-tracer.js';
import { FrameGenerator } from './Frame.js';

export const upscaleGenerator: FrameGenerator<Matrix4> =
    (frame, frames) => {
        const s = frame / frames;
        const transform = new Matrix4()
            .fromScale(s, s, s);
        return transform;
    };

export const rotationGenerator: FrameGenerator<Matrix4> =
    (frame, frames) => {
        const rY = 2 * Math.PI * frame / frames;
        const rotationY = new Matrix4()
            .fromRotationY(rY);

        const frameX = frame - frames / 2;
        const rX = Math.max(0, 2 * Math.PI * frameX / frames);
        const rotationX = new Matrix4()
            .fromRotationX(rX);
        const transform = new Matrix4()
            .mul(rotationY)
            .mul(rotationX);
        return transform;
    };

export const skewGenerator: FrameGenerator<Matrix4> =
    (frame, frames) => {
        const frameMaxXY = frames / 2;
        const frameXY = -(Math.abs(frame - frameMaxXY) - frameMaxXY);
        const xy = 1.4 * frameXY / frames;

        const frameStartYX = frames / 2;
        const frameMaxYX = (frames - frameStartYX) / 2;
        const frameYX = Math.max(
            -(Math.abs(frame - frameMaxYX - frameStartYX) - frameMaxYX),
            0);
        const yx = 1.8 * frameYX / frames;
        const transform = new Matrix4()
            .fromSkew(xy, 0, yx, 0, 0, 0);
        return transform;
    };

export const downscaleGenerator: FrameGenerator<Matrix4> =
    (frame, frames) => {
        const s = (frames - frame) / frames;
        const transform = new Matrix4()
            .fromScale(s, s, s);
        return transform;
    };
