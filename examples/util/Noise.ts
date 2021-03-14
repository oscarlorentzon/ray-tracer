import {
    Common,
    Interpolation,
} from "../../src/ray-tracer.js";

const frac = Common.frac;
const lerp = Interpolation.lerp;

function gradient(seedX: number, seedY: number): Array<number> {
    const pseudoRandom = 2920 *
        Math.sin(seedX * 21942 + seedY * 171324 + 8912) *
        Math.cos(seedX * 23157 * seedY * 217832 + 9758);
    return [Math.cos(pseudoRandom), Math.sin(pseudoRandom)];
}

function gridGradient(ix: number, iy: number, x: number, y: number): number {
    const [gx, gy] = gradient(ix, iy);
    const dx = x - ix;
    const dy = y - iy;
    return (dx * gx + dy * gy);
}

/**
 * 2D Perlin noise https://en.wikipedia.org/wiki/Perlin_noise.
 */
export function perlin(x: number, y: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    const n00 = gridGradient(x0, y0, x, y);
    const n01 = gridGradient(x1, y0, x, y);
    const sx = frac(x);
    const v0 = lerp(n00, n01, sx);

    const n10 = gridGradient(x0, y1, x, y);
    const n11 = gridGradient(x1, y1, x, y);
    const sy = frac(y);
    const v1 = lerp(n10, n11, sx);

    return lerp(v0, v1, sy);
}
