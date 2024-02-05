import fs from 'fs';
import crypto from 'crypto';
import { resolve } from 'path';

export function hash(pathForFile) {
    const __currentdir = process.cwd();
    const fullPath = resolve(__currentdir, pathForFile);
    const readStream = fs.createReadStream(fullPath, 'utf-8');
    const hash = crypto.createHash('sha256');
    readStream.on('data', (data) => {
        hash.update(data);
    });
    readStream.on('end', () => {
        const hexHash = hash.digest('hex');
        console.log(hexHash);
    })

    readStream.on('error', (err) => {
        console.log(`Something went wrong! ${err.message}`);
    })

}