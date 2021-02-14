import * as fs from 'fs';
import * as path from 'path';
import { Canvas } from '../../src/ray-tracer.js';

const ARTIFACTS = path.join(import.meta.url, '../../../artifacts');

export function writeFile(
    filename: string,
    data: string,
    silent: boolean = false): Promise<void> {
    const pathname = new URL(path.join(ARTIFACTS, filename)).pathname;
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                pathname,
                data,
                error => {
                    if (!!error) { reject(error); }
                    else {
                        if (!silent) {
                            console.log(`File written to ${pathname}`);
                        }
                        resolve();
                    }
                });
        });
}

export function canvasToPpm(canvas: Canvas): Promise<string> {
    return new Promise((resolve) => {
        const ppm = canvas.toPpm();
        resolve(ppm);
    })
}
