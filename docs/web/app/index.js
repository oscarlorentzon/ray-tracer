import { Viewer } from './ui/Viewer.js';
(function main() {
    const workerUrl = './web/worker/Renderer.worker.js';
    const workerOptions = { type: 'module' };
    const renderer = new Worker(workerUrl, workerOptions);
    const viewer = new Viewer(renderer);
    viewer.init();
})();
//# sourceMappingURL=index.js.map