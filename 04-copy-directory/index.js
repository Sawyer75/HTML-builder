const fs = require('fs');
const path = require('path');

function copyDir(sourceDir, targetDir) {
  // Read the contents of the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Copy each file from source to target directory
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      // Check if the current item is a file or a directory
      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error('Error stating file/directory:', err);
          return;
        }

        if (stats.isFile()) {
          // Copy the file to the target directory
          fs.copyFile(sourcePath, targetPath, err => {
            if (err) {
              console.error('Error copying file:', err);
            }
          });
        } else if (stats.isDirectory()) {
          // Recursively copy the subdirectory
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

fs.mkdir(targetDir, err => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }
  copyDir(sourceDir, targetDir);
});


  
