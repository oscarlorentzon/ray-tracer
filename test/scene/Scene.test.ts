import { Scene } from '../../src/scene/Scene.js';

test('creates scene', () => {
    const scene = new Scene();
    expect(scene).toBeDefined();
    expect(scene).toBeInstanceOf(Scene);
});

test('scene is empty', () => {
    const scene = new Scene();
    expect(scene.objects.length).toBe(0);
    expect(scene.ligths.length).toBe(0);
});
