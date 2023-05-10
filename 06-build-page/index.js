const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distPath = path.join(__dirname, 'project-dist');
const distIndexPath = path.join(distPath, 'index.html');
const distStylePath = path.join(distPath, 'style.css');
const distAssetsPath = path.join(distPath, 'assets');

const template = fs.readFileSync(templatePath, 'utf8');

const templateTags = template.match(/{{(.*?)}}/g);

let modifiedTemplate = template;

templateTags.forEach(tag => {
  const componentName = tag.slice(2, -2).trim();
  const componentFilePath = path.join(componentsPath, componentName + '.html');

  try {
    const componentContent = fs.readFileSync(componentFilePath, 'utf8');
    modifiedTemplate = modifiedTemplate.replace(tag, componentContent);
  } catch (error) {
    console.error(`Component file not found: ${componentFilePath}`);
  }
});

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

fs.writeFileSync(distIndexPath, modifiedTemplate);

const styleFiles = fs.readdirSync(stylesPath);

let mergedStyles = '';

styleFiles.forEach(file => {
  const filePath = path.join(stylesPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  mergedStyles += fileContent;
});

fs.writeFileSync(distStylePath, mergedStyles);

const copyDirectory = (source, destination) => {
    fs.mkdirSync(destination, { recursive: true });
  
    const files = fs.readdirSync(source);
  
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);
  
      const fileStats = fs.statSync(sourcePath);
  
      if (fileStats.isDirectory()) {
        copyDirectory(sourcePath, destinationPath);
      } else {
        fs.copyFileSync(sourcePath, destinationPath);
      }
    });
  };
  
  copyDirectory(assetsPath, distAssetsPath);
  
  