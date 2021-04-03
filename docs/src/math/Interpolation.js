import { clamp } from './Common.js';
export function inverseLerp(v0, v1, value) {
    return (value - v0) / (v1 - v0);
}
export function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
}
export function smoothStep(v0, v1, value) {
    const t = clamp(inverseLerp(v0, v1, value), 0, 1);
    return t * t * (3 - 2 * t);
}
export const smoothStepN = (n, v0, v1, value) => {
    if (n <= 0) {
        return value;
    }
    return smoothStepN(n - 1, v0, v1, smoothStep(v0, v1, value));
};
//# sourceMappingURL=Interpolation.js.map