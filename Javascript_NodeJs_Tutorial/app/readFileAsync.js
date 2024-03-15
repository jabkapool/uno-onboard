/*
const fs = require('fs')

fs.readFile('./app/file.md', 'utf-8', (err, content) => {
    if (err) {
        console.log(err)
    }
    console.log(content)
})
Things to notice here:
    error-handling: instead of a try-catch block you have to check for errors in the callback
    no return value: async functions don’t return values, but values will be passed to the callbacks
*/

const fs = require('fs');
console.log('console.log readFileAsync.js... START reading file Asynchronously\n');
fs.readFile('./app/fileReadASync.txt', 'utf-8', (err, content) => {
    if (err) {
        console.log('error happened during reading the file console.log readFileAsync.js');
        return console.log(err);
    }
    console.log(content);
}) 
console.log('console.log readFileAsync.js... END reading file Asynchronously\n'); //This will be printed first, because readFile is asynchronous