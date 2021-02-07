import { Vector } from '../src/Vector';

test('creates vector to be defined', () => {
    const vector = new Vector();
    expect(vector).toBeDefined();
});
