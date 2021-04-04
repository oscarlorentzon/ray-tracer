import { Visualization } from "./Visualization.js";
import { createCompatibility } from "./compatibility.js";

function onError(viz: Visualization)
    : (event: ErrorEvent) => void {
    return (event: ErrorEvent): void => {
        console.error(event.message);
        const compatibility = createCompatibility();
        document.body.removeChild(viz.canvas);
        document.body.appendChild(compatibility);
    };
}

(function main(): void {
    const workerUrl = './web/worker/Renderer.worker.js';
    const workerOptions: WorkerOptions = { type: 'module' };
    const renderer = new Worker(workerUrl, workerOptions);
    const viz = new Visualization(renderer);

    renderer.onerror = onError(viz);

    document.body.appendChild(viz.canvas);
    viz.render();
})();
