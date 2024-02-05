import * as fs from 'fs';
import { resolve } from 'path';

export function deleteFile(filePath) {
    const currentDir = process.cwd();
    const fullFilePath = resolve(currentDir, filePath);

    fs.unlink(fullFilePath, (err) => {
        if (err) {
            console.error(`Something went wrong! ${err}`);
        } else {
            console.log('Removing was succesfuly!');
        }
    })
}