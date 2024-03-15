const fs = require('node:fs');

const content = 'Content of file fileWriteReadAsync.txt ---';

fs.writeFile('./app/fileWriteReadAsync.txt', content, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been written Asynchronously - console.log from function fs.writeFile');
});

fs.readFile('./app/fileWriteReadAsync.txt', 'utf-8', (err, content) => {
    if (err) {
        console.log('Error happened during reading the file Asynchronous - consol.log function fs.readFile');
        return console.log(err);
    }
    console.log(content);
});