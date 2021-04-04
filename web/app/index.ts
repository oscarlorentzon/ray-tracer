import { Visualization } from "./ui/Visualization.js";
import { createCompatibility } from "./support/compatibility.js";
import { Sandbox } from "./ui/Sandbox.js";
import { SizeRequestContract } from "../contracts/RequestContract.js";

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
    const size: SizeRequestContract = { height: 512, width: 512 };
    const sandbox = new Sandbox(size);
    const viz = new Visualization(size, renderer);

    renderer.onerror = onError(viz);

    document.body.appendChild(sandbox.canvas);
    document.body.appendChild(viz.canvas);
    viz.render();
})();
