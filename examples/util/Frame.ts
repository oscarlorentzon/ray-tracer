export const zeroPad =
    (num: number, places: number) => String(num).padStart(places, '0');

export type Generator<T> = (frame: number, frames: number) => T;
export type Writer<T> = (frameId: number, value: T) => Promise<void>;

export async function generate<T>(
    frames: number,
    frameOffset: number,
    generator: Generator<T>,
    writer: Writer<T>): Promise<void> {
    for (let frame = 0; frame < frames; ++frame) {
        const value = generator(frame, frames);
        const frameId = frameOffset + frame;
        await writer(frameId, value);
    }
}
