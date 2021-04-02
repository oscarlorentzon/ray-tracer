import { Color } from '../../src/ray-tracer.js';

export function hsvToRgb(h: number, s: number, v: number): Color {
    h = 180 * h / Math.PI;
    const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    return new Color(f(5), f(3), f(1));
}
