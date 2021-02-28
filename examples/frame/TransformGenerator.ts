import { Matrix } from "../../src/ray-tracer.js";
import { FrameGenerator } from "./Frame.js";

export const upscaleGenerator: FrameGenerator<Matrix> =
    (frame, frames) => {
        const s = frame / frames;
        const transform = new Matrix()
            .fromScale(s, s, s);
        return transform;
    };

export const rotationGenerator: FrameGenerator<Matrix> =
    (frame, frames) => {
        const rY = 2 * Math.PI * frame / frames;
        const rotationY = new Matrix()
            .fromRotationY(rY);

        const frameX = frame - frames / 2;
        const rX = Math.max(0, 2 * Math.PI * frameX / frames);
        const rotationX = new Matrix()
            .fromRotationX(rX);
        const transform = new Matrix()
            .mul(rotationY)
            .mul(rotationX);
        return transform;
    };

export const skewGenerator: FrameGenerator<Matrix> =
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
        const transform = new Matrix()
            .fromSkew(xy, 0, yx, 0, 0, 0);
        return transform;
    };

export const downscaleGenerator: FrameGenerator<Matrix> =
    (frame, frames) => {
        const s = (frames - frame) / frames;
        const transform = new Matrix()
            .fromScale(s, s, s);
        return transform;
    };
