const path = require('path');
const fs = require('fs');
const distFolder = path.join(__dirname, 'project-dist');
const stylesFolder = path.join(__dirname, 'styles');
fs.readdir(distFolder, (_, files) => {
  files.forEach((file) => {
    if (file === 'bundle.css') {
      fs.unlink(path.join(distFolder, file), (err) => {
        if (err) throw err;
      });
    }
  })
  readFromStyles();
})

function readFromStyles() {
  let readableStream;
  fs.readdir(stylesFolder, { withFileTypes: true }, (_, dirents) => {
    dirents.forEach((dirent) => {
      if (dirent.isFile()) {
        if (path.extname(dirent.name) === '.css') {
          readableStream = fs.createReadStream(
            path.join(stylesFolder, dirent.name),
            'utf-8',
          );
          readableStream.on('data', (chunk) => appendFile(chunk));
        }
      }
    })
  })
}

function appendFile(data) {
  fs.appendFile(path.join(distFolder, 'bundle.css'), data, (err) => {
    if (err) throw err;
  }) 
}
