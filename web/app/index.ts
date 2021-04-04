import { Canvas } from "./Canvas.js";
import { createCompatibility } from "./compatibility.js";

function onError(canvas: Canvas)
    : (event: ErrorEvent) => void {
    return (event: ErrorEvent): void => {
        console.error(event.message);
        const compatibility = createCompatibility();
        document.body.removeChild(canvas.canvas);
        document.body.appendChild(compatibility);
    }
}

(function main(): void {
    const workerUrl = './web/worker/Renderer.worker.js';
    const workerOptions: WorkerOptions = { type: 'module' };
    const renderer = new Worker(workerUrl, workerOptions);
    const canvas = new Canvas(renderer)

    renderer.onerror = onError(canvas);

    document.body.appendChild(canvas.canvas);
    canvas.render();
})();
