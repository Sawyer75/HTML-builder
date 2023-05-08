const fs = require('fs');
const readline = require('readline');

const filePath = 'C:/Users/User/Desktop/HTML-builder/HTML-builder/02-write-file/outputFile.txt';
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Welcome! Enter text or type "exit" to quit.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Exiting...');
    rl.close();
  } else {
    writeStream.write(input + '\n', 'utf8');
  }
});

rl.on('close', () => {
  console.log('Goodbye!');
  writeStream.end();
});





