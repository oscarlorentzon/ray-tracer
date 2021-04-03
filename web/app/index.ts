import { Canvas } from "./Canvas.js";
import { createCompatibility } from "./compatibility.js";

(function main(): void {
    const workerUrl = './web/worker/Renderer.worker.js';
    const workerOptions: WorkerOptions = { type: 'module' };
    const renderer = new Worker(workerUrl, workerOptions);
    renderer.onerror = onError;

    const canvas = new Canvas(renderer)
    document.body.appendChild(canvas.canvas);
    canvas.render();

    function onError(event: ErrorEvent): void {
        console.error(event.message);
        const compatibility = createCompatibility();
        document.body.removeChild(canvas.canvas);
        document.body.appendChild(compatibility);
    }
})();
