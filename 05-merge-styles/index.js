const fs = require('fs');
const path = require('path');

const stylesDir = '05-merge-styles/styles';
const distDir = '05-merge-styles/project-dist';
const outputFileName = 'bundle.css';

fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading styles directory:', err);
    return;
  }

  const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');

  const cssContents = [];

  cssFiles.forEach(file => {
    const filePath = path.join(stylesDir, file.name);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    cssContents.push(fileContent);
  });

  const bundleContent = cssContents.join('\n');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  const bundlePath = path.join(distDir, outputFileName);
  fs.writeFile(bundlePath, bundleContent, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing bundle.css file:', err);
    } else {
      console.log('bundle.css file created successfully.');
    }
  });
});
