function copyDir() {
  const path = require('path');
  const fs = require('fs');
  const folderPath = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');
  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(folderPath, (_, files) => {
    fs.readdir(copyFolder, (_, destFiles) => {
      const filesToDelete = destFiles.filter((file) => !files.includes(file));
      filesToDelete.forEach((file) => {
        fs.unlink(path.join(copyFolder, file), (err) => {
          if (err) throw err;
        });
      });
    });
    files.forEach((file) => {
      fs.copyFile(
        path.join(folderPath, file),
        path.join(copyFolder, file),
        fs.constants.COPYFILE_FICLONE,
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
}

copyDir();
