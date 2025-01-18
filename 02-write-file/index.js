const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  flags: 'a',
});
stdout.write('Hello there! Write your text in console:\n');
stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => 
  stdout.write('\nThank you for your input, good luck in learning Node!\n'),
);

