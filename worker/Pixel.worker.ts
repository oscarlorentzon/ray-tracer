import {
    RequestContract,
    SizeRequestContract,
} from './contracts/RequestContract.js';
import { ResponseContract } from './contracts/ResponseContract.js';


const ctx: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;

ctx.onmessage = (event: MessageEvent<RequestContract>) => {
    const type = event.data.type;
    const params = event.data.params;

    if (type === 'render') {
        const size = (<SizeRequestContract>params).size;

        for (let y = 0; y < size.h; ++y) {
            const pixels = new Uint8Array(3 * size.w);
            for (let x = 0; x < size.w; ++x) {
                const i = 3 * x;
                pixels[i + 0] = 255;
                pixels[i + 1] = 0;
                pixels[i + 2] = 255;
            }
            const buffer = pixels.buffer;
            const message: ResponseContract = {
                params: { buffer: buffer, row: y },
                type: 'row',
            };
            ctx.postMessage(message, [buffer])
        }
    }
}
