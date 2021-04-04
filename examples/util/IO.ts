import * as fs from 'fs';
import * as path from 'path';
import { Canvas } from '../../src/ray-tracer.js';

const ARTIFACTS = path.join(import.meta.url, '../../../artifacts/');

export const zeroPad =
    (num: number, places: number): string => String(num).padStart(places, '0');

export function mkdirp(dirname: string): Promise<void> {
    const pathname = new URL(
        path.join(ARTIFACTS, dirname)).pathname;

    return new Promise((resolve, reject) => {
        fs.access(
            'file',
            error => {
                if (!error) { resolve(); return; }
                fs.mkdir(
                    pathname,
                    { recursive: true },
                    error => {
                        if (!error) { resolve(); return; }
                        reject(error);
                    });
            });
    })
}

function overwriteLine(message: string): void {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(message);
}

export function endLine(): void { process.stdout.write('\n'); }

export function writeFile(
    filename: string,
    data: string,
    silent = false): Promise<void> {
    const pathname = new URL(
        path.join(ARTIFACTS, filename)).pathname;
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                pathname,
                data,
                error => {
                    if (error) { reject(error); return; }
                    if (!silent) {
                        overwriteLine(`File written to ${pathname}`);
                    }
                    resolve();
                });
        });
}

export function canvasToPpm(canvas: Canvas): Promise<string> {
    return new Promise((resolve) => {
        const ppm = canvas.toPpm();
        resolve(ppm);
    })
}
