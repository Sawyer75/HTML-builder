const fs = require('fs');
const path = require('path');

function copyDir(sourceDir, targetDir) {
 
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  
  fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);

      
      if (file.isFile()) {
        
        fs.copyFile(sourcePath, targetPath, (err) => {
          if (err) {
            console.error('Error copying file:', err);
          }
        });
      } else if (file.isDirectory()) {
       
        copyDir(sourcePath, targetPath);
      }
    }
  });
}

const sourceDir = '04-copy-directory/files';
const targetDir = '04-copy-directory/files-copy';

copyDir(sourceDir, targetDir);


  
