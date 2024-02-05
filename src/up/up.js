import { resolve } from 'path';
import * as fs from 'fs';

export async function up(dir) {
    try {
        const parentPath = resolve(dir, '..');
        await fs.promises.access(parentPath, fs.constants.R_OK);
        process.chdir(parentPath);
        return process.cwd();
    } catch (err) {

        console.error(`Something went wrong! ${err}`);
        return dir;
    }
}