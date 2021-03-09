import { PointLight } from "../../src/light/PointLight.js";
import { Point } from "../../src/math/Point.js";
import { Color } from "../../src/paint/Color.js";

test('create point light', () => {
    const light = new PointLight(
        new Point(0, 0, 0),
        new Color(1, 1, 1));

    expect(light).toBeDefined();
    expect(light).toBeInstanceOf(PointLight);
});

test('position and color are set', () => {
    const position = new Point(0, 0, 0);
    const intensity = new Color(1, 1, 1);
    const light = new PointLight(
        position,
        intensity);

    expect(light.position).toBeDefined();
    expect(light.position).toBe(position);

    expect(light.intensity).toBeDefined();
    expect(light.intensity).toBe(intensity);
});
