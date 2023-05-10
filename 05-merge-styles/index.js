const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const distFolderPath = path.join(__dirname, 'project-dist');
const outputFile = path.join(distFolderPath, 'bundle.css');

function collectStyles() {
  fs.readdir(stylesFolderPath, (err, files) => {
    if (err) {
      console.error('Error reading styles folder:', err);
      return;
    }

    const cssFiles = files.filter(file => path.extname(file) === '.css');

    const styles = [];

    cssFiles.forEach(file => {
      const filePath = path.join(stylesFolderPath, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        styles.push(data);

        if (styles.length === cssFiles.length) {
          const allStyles = styles.join('\n');
          fs.writeFile(outputFile, allStyles, err => {
            if (err) {
              console.error('Error writing bundle.css file:', err);
              return;
            }
            console.log('bundle.css file created successfully.');
          });
        }
      });
    });
  });
}

collectStyles();
