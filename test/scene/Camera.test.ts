import { Matrix4 } from "../../src/math/Matrix4.js";
import { Point } from "../../src/math/Point.js";
import { Vector } from "../../src/math/Vector.js";
import { Camera } from "../../src/scene/Camera.js";
import { expectMatrixToBeCloseTo } from "../Util.js";

test('creates camera', () => {
    const camera = new Camera();
    expect(camera).toBeDefined();
    expect(camera).toBeInstanceOf(Camera);
});

test('creates camera with identity view matrix', () => {
    const camera = new Camera();

    const viewMatrix = camera.viewMatrix;

    expect(viewMatrix.entries).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
});

test('lookat returns camera', () => {
    const camera = new Camera();

    const from = new Point(0, 0, 0);
    const to = new Point(0, 0, 1);
    const up = new Vector(0, 1, 0);

    const lookat = camera.lookAt(from, to, up);

    expect(lookat).toBeDefined();
    expect(lookat).toBe(camera);
});

test('lookat returns identity', () => {
    const camera = new Camera();

    const from = new Point(0, 0, 0);
    const to = new Point(0, 0, -1);
    const up = new Vector(0, 1, 0);

    camera.lookAt(from, to, up);

    expectMatrixToBeCloseTo(
        camera.viewMatrix.entries,
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ],
        5);
});

test('look in positive z direction', () => {
    const camera = new Camera();

    const from = new Point(0, 0, 0);
    const to = new Point(0, 0, 1);
    const up = new Vector(0, 1, 0);

    camera.lookAt(from, to, up);

    expectMatrixToBeCloseTo(
        camera.viewMatrix.entries,
        new Matrix4()
            .fromScale(-1, 1, -1)
            .entries,
        5);
});

test('lookat moves the world', () => {
    const camera = new Camera();

    const from = new Point(0, 0, 8);
    const to = new Point(0, 0, 0);
    const up = new Vector(0, 1, 0);

    camera.lookAt(from, to, up);

    expectMatrixToBeCloseTo(
        camera.viewMatrix.entries,
        new Matrix4()
            .fromTranslation(0, 0, -8)
            .entries,
        5);
});

test('an arbitrary view transformation', () => {
    const camera = new Camera();

    const from = new Point(1, 3, 2);
    const to = new Point(4, -2, 8);
    const up = new Vector(1, 1, 0);

    camera.lookAt(from, to, up);

    expectMatrixToBeCloseTo(
        camera.viewMatrix.entries,
        [
            -0.514495, 0.514495, 0.685994, -2.40098,
            0.778924, 0.614940, 0.122988, -2.86972,
            -0.358568, 0.597614, -0.717137, 0,
            0, 0, 0, 1,
        ],
        5);
});
