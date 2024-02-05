import { createInterface } from 'readline';
import process from 'process';
import { cd } from './cd/cd.js';
import { list } from './ls/ls.js';
import { up } from './up/up.js';
import { readFn } from './read/read.js';
import { createFile } from './createFile/createFile.js';
import { renameFile } from './rename/rename.js';
import { copyFiles } from './copyFiles/copyFiles.js';
import { moveFiles } from './moveFile/moveFile.js';
import { deleteFile } from './deleteFile/deleteFile.js';
import { handler } from './os_Functions/os.js';
import { hash } from './hash/hash.js';
import { commpress } from './zip/compress.js';
import { deCommpress } from './zip/decompress.js';

const userName = process.argv.slice(2)[0].replace('--username=', '');
let __currentdir = process.cwd();
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Welcome to the File Manager, ${userName}!`);

process.stdin.setEncoding('utf8');

rl.on('line', async (data) => {
    const comand = data;
    if (comand === '.exit') {
        rl.close();
    } else if (comand === 'ls') {
        try {
            list(__currentdir);
        } catch (err) {
            console.error(err);
        }
    } else if (comand === 'up') {
        try {
            __currentdir = await up(__currentdir);
        } catch (err) {
            console.error(err);
        }
    } else if (comand.startsWith('cd')) {
        const newDir = comand.slice(2).trim();
        try {
            __currentdir = cd(__currentdir, newDir);
        } catch (err) {
            console.error(err);
        }
    } else if (comand.startsWith('cat')) {
        try {
            const fileToRead = comand.slice(3).trim();
            readFn(fileToRead);
        } catch (err) {
            console.error(err)
        }
    } else if (comand.startsWith('add')) {
        try {
            const filePath = comand.slice(3).trim();
            createFile(filePath);
        } catch (err) {
            console.err(err);
        }
    } else if (comand.startsWith('rn')) {
        const args = comand.split(' ');
        try {  
            renameFile(args[1], args[2]);
        } catch (err) {
            console.err(err);
        }
    } else if (comand.startsWith('cp')) {
        const args = comand.split(' ');
        try {
            copyFiles(args[1], args[2]);
        } catch (err) {
            console.err(err);
        }
    } else if (comand.startsWith('mv')) {
        const args = comand.split(' ');
        try {
            moveFiles(args[1], args[2]);
        } catch {
            console.err(err);
        }
    } else if (comand.startsWith('rm')) {
        const args = comand.split(' ');
        try {
            deleteFile(args[1]);
        } catch (err) {
            console.log(err);
        }
    } else if (comand.startsWith('os')) {
        const args = comand.split(' ');
        handler(args[1]);
    } else if (comand.startsWith('hash')) {
        const args = comand.split(' ');
        hash(args[1]);
    } else if (comand.startsWith('compress')) {
        const args = comand.split(' ');
        commpress(args[1], args[2]);
    } else if (comand.startsWith('decompress')) {
        const args = comand.split(' ');
        deCommpress(args[1], args[2]);
    } else {
        console.error('Invalid input');
    }
    
    console.log(`You are currently in ${__currentdir}`);
})

process.on('SIGINT', () => {
    rl.close();
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
});
