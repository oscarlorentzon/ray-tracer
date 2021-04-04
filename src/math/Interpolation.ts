import { clamp } from './Common.js';

export function inverseLerp(
    v0: number,
    v1: number,
    value: number): number {
    return (value - v0) / (v1 - v0);
}

export function lerp(
    v0: number,
    v1: number,
    t: number): number {
    return v0 + t * (v1 - v0);
}

export function smoothStep(
    v0: number,
    v1: number,
    value: number): number {
    const t = clamp(inverseLerp(v0, v1, value), 0, 1);
    return t * t * (3 - 2 * t);
}

export const smoothStepN = (
    n: number,
    v0: number,
    v1: number,
    value: number): number => {
    if (n <= 0) { return value; }
    return smoothStepN(n - 1, v0, v1, smoothStep(v0, v1, value));
};
