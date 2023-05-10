const fs = require('fs-extra');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(distFolder, 'bundle.css');

async function collectStyles() {
  try {
    const files = await fs.readdir(stylesFolder);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    let collectedStyles = '';

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolder, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      collectedStyles += fileContent;
    }

    await fs.ensureDir(distFolder);
    await fs.writeFile(outputFile, collectedStyles);

    console.log('bundle.css file created');
  } catch (error) {
    console.error('Error writing bundle.css file:', error);
  }
}
collectStyles();
