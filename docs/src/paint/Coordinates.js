/**
 * Convert canvas coordinates to viewport coordiantes.
 *
 * @description Viewport coordinates are 2D coordinates
 * on the [-1, 1] interval and have the origin point
 * in the center. The bottom left corner point is
 * (-1, -1) and the top right corner point is (1, 1).
 *
 * Canvas coordiantes are in pixel space with the
 * (0, 0) coordinate in top left corner and the
 * bottom right corner at (width - 1, height - 1).
 */
export function canvasToViewport(canvasX, canvasY, canvasWidth, canvasHeight) {
    const viewportX = 2 * canvasX / canvasWidth - 1;
    const viewportY = 1 - 2 * canvasY / canvasHeight;
    return [viewportX, viewportY];
}
//# sourceMappingURL=Coordinates.js.map