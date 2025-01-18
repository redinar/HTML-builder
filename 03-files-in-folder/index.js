const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, { withFileTypes: true }, (_, dirents) => {
  dirents.forEach((dirent) => {
    if (dirent.isFile()) {
      const filePath = path.join(folderPath, dirent.name);
      fs.stat(filePath, (_, stats) => {
        const ext = path.extname(dirent.name);
        const nameWithoutExt = path.basename(dirent.name, ext);
        const sizeInKb = Math.round((stats.size / 1024) * 100) / 100;
        console.log(`${nameWithoutExt} - ${ext.slice(1)} - ${sizeInKb}kb`);
      });
    }
  });
});
