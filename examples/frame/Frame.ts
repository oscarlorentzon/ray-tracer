export type Animation<T> = {
    frames: number,
    generator: FrameGenerator<T>,
};

export type Animations<T extends number | string | object> = {
    frames: number,
    generators: Array<FrameGenerator<T>>,
};

export type FrameGenerator<T> = (frame: number, frames: number) => T;

export type FrameWriter<T> = (frameId: number, value: T) => Promise<void>;

export async function animate<T>(
    animations: Array<Animation<T>>,
    writer: FrameWriter<T>): Promise<void> {
    let frameOffset = 0;
    for (const animation of animations) {
        const frames = animation.frames;
        await generateFrames(
            frames,
            frameOffset,
            animation.generator,
            writer);
        frameOffset += frames;
    }
}

export async function animateMulitple<T extends number | string | object>(
    animations: Array<Animations<T>>,
    writer: FrameWriter<Array<T>>): Promise<void> {
    let frameOffset = 0;
    for (const animation of animations) {
        const frames = animation.frames;
        await generateFramesMultiple(
            frames,
            frameOffset,
            animation.generators,
            writer);
        frameOffset += frames;
    }
}

export async function generateFrames<T>(
    frames: number,
    frameOffset: number,
    generator: FrameGenerator<T>,
    writer: FrameWriter<T>): Promise<void> {
    for (let frame = 0; frame < frames; ++frame) {
        const value = generator(frame, frames);
        const frameId = frameOffset + frame;
        await writer(frameId, value);
    }
}

export async function generateFramesMultiple<T>(
    frames: number,
    frameOffset: number,
    generators: Array<FrameGenerator<T>>,
    writer: FrameWriter<Array<T>>): Promise<void> {
    for (let frame = 0; frame < frames; ++frame) {
        const values = generators
            .map(generator => generator(frame, frames));
        const frameId = frameOffset + frame;
        await writer(frameId, values);
    }
}
