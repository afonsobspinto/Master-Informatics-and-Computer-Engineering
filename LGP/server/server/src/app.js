
const port = process.env.PORT || 3000;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const { auth, importAdminCard } = require('./composer/data.service');

// Set up the express app
const app = express();
const routes = require('./routes/index');

// Set up cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, withCredentials');
  res.send(200);
});

// Log requests to the console.
app.use(logger('dev'));

app.use(session({
  secret: 'cats',
  resave: true,
  saveUninitialized: true,
}));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Authentication
require('./auth/passport');

app.use(passport.initialize());
app.use(passport.session());

// Composer

auth()
  .then((res) => {
    const reqCookieStr = res.headers['set-cookie'].join();

    const cookiesRegex = '^([^;]*;).*(userId=[^;]*;).*(connect.sid=[^;]*)';
    const cookieMatch = reqCookieStr.match(cookiesRegex);

    // if(cookieMatch.lenght !== 7)
    //   throw new Error('Auth: Didn\'t all the expected cookies');

    session.cookies = `${cookieMatch[1]} ${cookieMatch[2]} ${cookieMatch[3]}`;

    // importAdminCard();
  })
  .then(() => console.log('Admin Card Imported'))
  .catch(err => console.log(err.message));


// Require our routes into the application.
app.use('/', routes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(404).send({
  message: 'Welcome to the beginning of nothingness.',
}));

/*
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
*/

const db = require('./models/index');

db.sequelize.sync({
  force: true,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});

module.exports = app;
