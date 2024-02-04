import process from 'process';

const userName = process.argv.slice(2)[0].replace('--username=', '');

console.log(`Hello ${userName}`);