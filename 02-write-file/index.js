const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = './02-write-file/output.txt';

console.log('Welcome! Please enter your text (type "exit" to quit):');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Exiting...');
    rl.close();
  } else {
    fs.appendFile(filePath, input + '\n', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text written to file successfully!');
      }
      console.log('Enter your text:');
    });
  }
});

rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});





