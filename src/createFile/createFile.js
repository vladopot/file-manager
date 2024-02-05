import * as fs from 'fs';

export function createFile(fileName) {
    const __currentdir = process.cwd();
    const fullNewFilePath = `${__currentdir}\\${fileName}`;

    fs.writeFile(fullNewFilePath, '', 'utf8', (err) => {
       if (err) {
        console.error(err);
       } else {
        console.log('File createed!');
       }
    })
}