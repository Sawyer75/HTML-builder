const fs = require('fs');
const path = require('path');

const folderPath = path.join('03-files-in-folder/secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = fileSizeInBytes / 1024;
        const fileExtension = path.extname(file);
        const fileName = path.basename(file, fileExtension);

        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKb.toFixed(3)}kb`);
      }
    });
  });
});

