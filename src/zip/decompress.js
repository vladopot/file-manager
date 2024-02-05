import zlib  from 'zlib';
import * as fs from 'fs';
import { resolve } from 'path';

export function deCommpress(fileToDeCompress, Path) {
    const __currentdir = process.cwd();
    const fileToDeCompressFullPath = resolve(__currentdir, fileToDeCompress);
    const pathFull = resolve(__currentdir, Path);
    const readStream = fs.createReadStream(fileToDeCompressFullPath);
    const writeStream = fs.createWriteStream(pathFull);
    const zipStream = zlib.createBrotliDecompress();
    
    zipStream.on('error', (err) => {
        console.error(`Decompression failed: ${err.message}`);
        readStream.destroy();
    });

    readStream.pipe(zipStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('DeCompressed succesfyly!');
    })

    writeStream.on('error', (err) => {
        console.error(`writing failed: ${err.message}`);
        writeStream.destroy();
    });
}