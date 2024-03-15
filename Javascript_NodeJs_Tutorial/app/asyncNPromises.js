const fs = require('fs');

function stats(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

Promise.all([
    stats('./app/fileWriteReadAsync.txt'),
    stats('./app/fileReadAsync.txt'),
    stats('./app/fileReadSync.txt'),
])
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

/************************************ The same ********************************/

const async = require('async');
async.map(['./app/fileWriteReadAsync.txt', './app/fileReadAsync.txt', './app/fileReadSync.txt'], fs.stat, function (err, results) {
    //Results is now an array of stats for each file
    if (err) {
        return console.log(err);
    }
    console.log(results);
});
