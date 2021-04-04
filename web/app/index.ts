import { Viewer } from './ui/Viewer.js';

(function main(): void {
    const workerUrl = './web/worker/Renderer.worker.js';
    const workerOptions: WorkerOptions = { type: 'module' };
    const renderer = new Worker(workerUrl, workerOptions);
    const viewer = new Viewer(renderer);
    viewer.init();
})();
