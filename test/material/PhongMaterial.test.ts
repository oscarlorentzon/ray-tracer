import { PhongMaterial } from "../../src/material/PhongMaterial";

test('create a phong material', () => {
    const material = new PhongMaterial();

    expect(material).toBeDefined();
    expect(material).toBeInstanceOf(PhongMaterial);
});
