import zlib  from 'zlib';
import * as fs from 'fs';
import { resolve } from 'path';

export function commpress(fileToCompress, archivePath) {
    const __currentdir = process.cwd();
    const fileToCompressFullPath = resolve(__currentdir, fileToCompress);
    const archivePathFull = resolve(__currentdir, archivePath);
    const readStream = fs.createReadStream(fileToCompressFullPath);
    const writeStream = fs.createWriteStream(`${archivePathFull}`);
    const zipStream = zlib.createBrotliCompress();
    readStream.pipe(zipStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Compressed succesfyly!');
    })

    zipStream.on('error', (err) => {
        console.log(`Compressing went wrond! ${err.message}`);
    })

    readStream.on('error', (err) => {
        console.log(`Reading went wrond! ${err.message}`);
    })

    writeStream.on('error', (err) => {
        console.log(`Somethind went wrond! ${err.message}`);
    })
}