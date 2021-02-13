export const EPSILON = 0.000001;

export function equals(v1: number, v2: number): boolean {
    const diff = Math.abs(v2 - v1);
    const scale = Math.max(1, Math.abs(v1), Math.abs(v2));
    return diff < scale * EPSILON;
}
