/********************************************    Http Server   *************************************************/

//*****************************************************************************************//
//*********************************** http module for Node.js Server **********************//
//*****************************************************************************************//
/*
const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
    console.log(request.url);
    response.end('Hello Node.js Server!');
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
*/

//*****************************************************************************************//
//********** Express - Fast, unopinionated, minimalist web framework for Node.js **********//
//*****************************************************************************************//

/*
const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
*/

//*****************************************************************************************//
//****************** Write randon number in json or hey in plai text **********************//
//*****************************************************************************************//
/*
const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random();
  next()
})

app.get('/', (request, response) => {
  //response.json({
  //  chance: request.chance
  //})
  response.format({
    'text/plain': () => {
      response.send('hey')
    }    
})});

app.listen(3000);
*/

//*****************************************************************************************//
//*********************************** Throw Http 500 Error ********************************//
//*****************************************************************************************//
/*
const express = require('express')
const app = express()

app.get('/', (request, response) => {
  throw new Error('oops')
});

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
});

app.listen(3000);
*/

//*****************************************************************************************//
//************************************** Rendering HTML ***********************************//
//*****************************************************************************************//

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

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

app.listen(3000);
