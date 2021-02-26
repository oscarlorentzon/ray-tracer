import {
    Color,
    Matrix,
} from "../../src/ray-tracer.js";

export const zeroPad =
    (num: number, places: number) => String(num).padStart(places, '0');

export type TransformGenerator = (frame: number, frames: number) => Matrix;
export type ColorGenerator = (frame: number, frames: number) => Color;

export type TransformWriter =
    (frameId: number, transform: Matrix) => Promise<void>;
export type ColorWriter =
    (frameId: number, color: Color) => Promise<void>;

export async function generateTransforms(
    frames: number,
    frameOffset: number,
    generator: TransformGenerator,
    writer: TransformWriter): Promise<void> {
    for (let frame = 0; frame < frames; ++frame) {
        const transform = generator(frame, frames);
        const frameId = frameOffset + frame;
        await writer(frameId, transform);
    }
}

export async function generateColors(
    frames: number,
    frameOffset: number,
    generator: ColorGenerator,
    writer: ColorWriter): Promise<void> {
    for (let frame = 0; frame < frames; ++frame) {
        const color = generator(frame, frames);
        const frameId = frameOffset + frame;
        await writer(frameId, color);
    }
}
