import * as os from 'os';
import { list } from '../ls/ls.js';

export function handler(comand) {
    switch (comand) {
        case '--EOL':
            eol();
        break;
        case '--cpus':
            cpus();
        break;
        case '--homedir':
            homeDir();
        break;
        case '--username':
            userName();
        break;
        case '--architecture':
            cpuArch();
        default:
            console.log('Invalid input');
    }
}

function eol() {
    try {
        const result = JSON.stringify(os.EOL);
        console.log(`default system End-Of-Line ${result}`);
    } catch (err) {
        console.log(`Something went wrong! ${err}`);
    }
}

function cpus() {
    try {
        const cpuInfo = os.cpus();
        console.log(`Overall amount of CPUS ${cpuInfo.length}`);
        console.log(`CPU Model ${cpuInfo[0].model}`);
        cpuInfo.forEach(e => {
        console.log(e.speed);
    })
    } catch (err) {
        console.log(`Something went wrong! ${err}`);
    }
}

function homeDir() {
    try {
        const homeDir = os.homedir();
        console.log(homeDir);
        list(homeDir);
    } catch (err) {
        console.log(`Something went wrong! ${err}`);
    }
}

function userName() {
    try {
        const userName = os.userInfo().username;
        console.log(`Current system user name: ${userName}`);
    } catch (err) {
        console.log(`Something went wrong! ${err}`);
    }
    
}

function cpuArch() {
    try {
        const result = process.arch;
        console.log(result);
    } catch (err) {
        console.log(`Something went wrong! ${err}`);
    }
    
}