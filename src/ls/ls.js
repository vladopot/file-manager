import { resolve } from 'path';
import * as fs from 'fs';
import { error } from 'console';

export async function list(folder) {
    const __currentdir = folder;
    let result = [];

    try {
        const dir = await fs.promises.readdir(__currentdir);
            for (const e of dir) {
                try {
                    const fullPath = resolve(__currentdir, e);
                    const elemArr = [];
                    const stat = await fs.promises.stat(fullPath);
                    const fileType = stat.isDirectory() ? 'Directory' : 'File';
                    elemArr.push(e, fileType);
                    result.push(elemArr);
                } catch (err) {
                    console.error(`Error with file ${err}`)
                    continue;
                }
            }
        result.sort((a, b) => {
            if (a[1] !== b[1]) {
                return (a[1] === 'Directory') ? -1 : 1;
            }
        })
        result.forEach((e, index) => {
            e.unshift(index + 1);
        });
        console.log(result);
    } catch (err) {
        console.error('You must have administrator privileges!');
        console.error(error);
    }
    
}