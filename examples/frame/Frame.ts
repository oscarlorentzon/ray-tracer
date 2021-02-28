export type FrameGenerator<T> = (frame: number, frames: number) => T;

export type FrameWriter<T> = (frameId: number, value: T) => Promise<void>;

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
