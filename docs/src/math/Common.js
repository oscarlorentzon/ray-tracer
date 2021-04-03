export const EPSILON = 0.000001;
export function equals(v1, v2) {
    const diff = Math.abs(v2 - v1);
    const scale = Math.max(1, Math.abs(v1), Math.abs(v2));
    return diff < scale * EPSILON;
}
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
export function even(value) {
    return Math.floor(value) % 2 === 0;
}
export function frac(value) {
    return value - Math.floor(value);
}
//# sourceMappingURL=Common.js.map