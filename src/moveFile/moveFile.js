import * as fs from 'fs';
import { resolve } from 'path';

export function moveFiles (fileToMove, newFile) {
    const __currentdir = process.cwd();
    const fileToMovePath = resolve(__currentdir, fileToMove);
    const newFilePath = resolve(__currentdir, newFile);

    const readStream =  fs.createReadStream(fileToMovePath);
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

    writeStream.on('end', (err) => {
        writeStream.destroy();
    })

    writeStream.on('finish', () => {
        console.log('Moving was succesfully');
        fs.unlink(fileToMove, (err) => {
            if (err) {
                 console.log('Something went wrong!')
            }
        });
    })

    readStream.pipe(writeStream);
}