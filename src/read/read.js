import * as fs from 'fs';
import { resolve } from 'path';
import { list } from '../ls/ls.js';

export async function readFn(filePath) {
    let __currentdir = process.cwd();
    const fullPath = resolve(__currentdir, filePath);
    const stats = await fs.promises.stat(fullPath);
    if (stats.isDirectory()) {
        list(fullPath);
        return;
    }
    const readStream = fs.createReadStream(fullPath);
    readStream.setEncoding('utf8');

    readStream.on('data', (data) => {
        console.log(data);
    })

    readStream.on('end', () => {
        readStream.destroy();
    })

    readStream.on('error', (err) => {
        console.error(`Something went wrong! ${err.message}`);
        readStream.destroy();
    })
}