import * as fs from 'fs';
import { resolve } from 'path';

export function copyFiles (fileToCopy, newFile) {
    const __currentdir = process.cwd();
    const fileToCopyPath = resolve(__currentdir, fileToCopy);
    const newFilePath = resolve(__currentdir, newFile);

    const readStream =  fs.createReadStream(fileToCopyPath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.on('error', (err) => {
        console.error('Something went wrong!');
        readStream.destroy();
    })

    writeStream.on('error', (err) => {
        console.error('Something went wrong!');
        writeStream.destroy();
    })

    readStream.on('end', (err) => {
        readStream.destroy();
    })

    writeStream.on('finish', (err) => {
        console.log('Copying was succesfyly!');
        writeStream.destroy();
    })

    readStream.pipe(writeStream);
}