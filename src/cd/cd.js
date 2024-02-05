import { resolve } from 'path';
import * as fs from 'fs';

export function cd(currentDir, newDir) {
    try {
        const newPath = resolve(currentDir, newDir);
        process.chdir(newPath);
        return process.cwd();
    } catch (err) {
        console.log(`Something went wrong! ${err}`)
    }
}