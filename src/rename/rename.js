import * as fs from 'fs';
import { resolve } from 'path';

export function renameFile(oldName, newName) {
    const __currentdir = process.cwd();
    const oldFullPath = resolve(__currentdir, oldName);
    const newFullPath = resolve(__currentdir, newName);

    fs.rename(oldFullPath, newFullPath, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Rename was succesfuly!');
        }
    });
}