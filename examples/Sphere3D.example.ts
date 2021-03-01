import {
    Canvas,
    Point,
    Sphere,
    PhongMaterial,
    PointLight,
} from "../src/ray-tracer.js";
import { Sphere3D } from "./painters/Sphere3D.js";
import {
    animate,
    FrameWriter,
} from "./frame/Frame.js";
import {
    canvasToPpm,
    endLine,
    mkdirp,
    writeFile,
    zeroPad,
} from "./util/IO.js";
import { dayArc } from "./frame/PointLightGenerator.js";

const SPHERE3D_PATH = 'sphere3d/ppm/';

(async function main() {
    const sphere = new Sphere(new PhongMaterial());
    sphere.material.shininess = 20;
    const eyePosition = new Point(0, 0, 5);
    const sphere3D = new Sphere3D(new Canvas(128, 128), 16);

    const writer: FrameWriter<PointLight> = async (frameId, light) => {
        sphere3D.canvas.clear();
        await new Promise<void>((resolve) => {
            sphere3D.paint(eyePosition, sphere, light);
            resolve();
        });
        const ppm = await canvasToPpm(sphere3D.canvas);
        const filename = `sphere3d_${zeroPad(frameId, 4)}.ppm`;
        await writeFile(`${SPHERE3D_PATH}${filename}`, ppm);
    };

    const animations = [{
        frames: 150,
        generator: dayArc(
            new Point(0, -10, 4),
            new Point(0, 0, 0))
    }];

    await mkdirp(SPHERE3D_PATH);
    animate(animations, writer)
    endLine();
})();
