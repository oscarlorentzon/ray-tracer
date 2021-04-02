export type Size = {
    h: number;
    w: number;
}

export type Pixel = {
    x: number;
    y: number;
};

export function* bfs(
    root: Pixel,
    size: Size)
    : Generator<Pixel, Pixel, boolean> {

    if (!inside(root, size)) { return; }

    const discovered = new Set<string>();
    const queue: Array<Pixel> = [];

    discovered.add(pixelToId(root));
    queue.push(root);
    while (queue.length) {
        const source = queue.shift();
        yield source;
        for (const target of edgeTargets(source)) {
            if (!inside(target, size)) { continue; }
            const id = pixelToId(target);
            if (discovered.has(id)) { continue; }
            discovered.add(id);
            queue.push(target);
        }
    }
}

function inside(pixel: Pixel, size: Size): boolean {
    return 0 <= pixel.x && pixel.x < size.w &&
        0 <= pixel.y && pixel.y < size.h;
}

function pixelToId(pixel: Pixel): string {
    return `${pixel.y}-${pixel.x}`;
}

function edgeTargets(source: Pixel): Array<Pixel> {
    return [
        { x: source.x, y: source.y - 1 },
        { x: source.x + 1, y: source.y },
        { x: source.x, y: source.y + 1 },
        { x: source.x - 1, y: source.y },
    ]
}
