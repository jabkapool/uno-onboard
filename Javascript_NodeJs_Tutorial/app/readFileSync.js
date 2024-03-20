const fs = require('fs');
let content;
try {
    content = fs.readFileSync("./app/fileReadSync.txt", "utf-8"); //It's printing undefined
} catch(ex) {
    console.log(ex);
}
console.log(content);