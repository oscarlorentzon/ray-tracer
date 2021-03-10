import { canvasToViewport } from "../../src/paint/Coordinates.js";

it("should convert canvas origin to (-1, 1)", () => {
    const canvasX = 0;
    const canvasY = 0;
    const canvasW = 64;
    const canvasH = 32;

    const [viewportX, viewportY] = canvasToViewport(
        canvasX,
        canvasY,
        canvasW,
        canvasH);

    expect(viewportX).toBe(-1);
    expect(viewportY).toBe(1);
});

it("should convert canvas max to (1, -1)", () => {
    const canvasW = 64;
    const canvasH = 32;
    const canvasX = canvasW;
    const canvasY = canvasH;


    const [viewportX, viewportY] = canvasToViewport(
        canvasX,
        canvasY,
        canvasW,
        canvasH);

    expect(viewportX).toBe(1);
    expect(viewportY).toBe(-1);
});

it("should convert canvas center to (0, 0)", () => {
    const canvasW = 64;
    const canvasH = 32;
    const canvasX = canvasW / 2;
    const canvasY = canvasH / 2;


    const [viewportX, viewportY] = canvasToViewport(
        canvasX,
        canvasY,
        canvasW,
        canvasH);

    expect(viewportX).toBe(0);
    expect(viewportY).toBe(0);
});
