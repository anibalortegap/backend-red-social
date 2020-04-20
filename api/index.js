const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config');

const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

//use body-parser

app.use(bodyParser.json());

//use documentation swagger doc

const swaggerDoc = require('../swagger.json');

//definitions the routes
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, (data, err) => {
  if (err) {
    console.log(new Error(err));
  } else {
    console.log('Api listening in the port', config.api.port);
  }
});
