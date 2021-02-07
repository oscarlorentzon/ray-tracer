import { Point } from '../src/Point';

test('creates point to be defined', () => {
    const point = new Point();
    expect(point).toBeDefined();
});
