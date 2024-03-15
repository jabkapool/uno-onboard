const request = require('request-promise');
//sending a GET request
const options = {
    method: 'GET',
    //uri: 'https://risingstack.com',
    uri: 'https://jsonplaceholder.typicode.com/todos/1',
    json: true
};

request(options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });