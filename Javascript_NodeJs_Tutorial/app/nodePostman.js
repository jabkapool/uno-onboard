const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
var bodyParser = require('body-parser');

app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response) => {
    response.render('home', {
      name: 'John'
    })
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [];

/*
app.post('/users', (request, response) => {    
    //console.log(request.body.name);    
    //console.log(request.body.age);
    //http://localhost:3000/users Postman  Body->raw->JSON->{"name":"Joao","age":47}
    const user = request.body;    
    users.push({
      name: user.name,
      age: user.age
    });
    console.log(users);
    response.json({status: 'success', message: 'User added successfully'});
});
*/


//storing data in a file
const fs = require('fs');

app.post('./app/users', (request, response) => {
    const user = request.body;
    fs.appendFile('users.txt', JSON.stringify({name: user.name, age: user.age}) + '\n', (err) => {
        response.send('successfully registered');
        });
});

app.listen(3000);
