import * as fs from 'fs';
import * as path from 'path';

const ARTIFACTS = path.join(import.meta.url, '../../../artifacts');

export function writeFile(filename: string, data: string): Promise<void> {
    const pathname = new URL(path.join(ARTIFACTS, filename)).pathname;
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                pathname,
                data,
                error => {
                    if (!!error) { reject(error); }
                    else {
                        console.log(`File written to ${pathname}`)
                        resolve();
                    }
                });
        });
}
