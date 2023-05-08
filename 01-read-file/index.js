const fs = require('fs');
const path = require('path');

const filePath = path.join('01-read-file/text.txt');

const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});

readStream.on('error', (err) => {
  console.error(err);
});