const fs = require('fs');
const path = require('path');

function copyDir(sourceDir, targetDir) {

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      
      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error('Error stating file/directory:', err);
          return;
        }

        if (stats.isFile()) {
         
          fs.copyFile(sourcePath, targetPath, err => {
            if (err) {
              console.error('Error copying file:', err);
            }
          });
        } else if (stats.isDirectory()) {
         
          fs.mkdir(targetPath, err => {
            if (err) {
              console.error('Error creating directory:', err);
              return;
            }
            copyDir(sourcePath, targetPath);
          });
        }
      });
    });
  });
}

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');


fs.rmdir(targetDir, { recursive: true }, err => {
  if (err && err.code !== 'ENOENT') {
    console.error('Error removing existing directory:', err);
    return;
  }

  
  fs.mkdir(targetDir, err => {
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }
    copyDir(sourceDir, targetDir);
  });
});



  
