'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const v1Router = require('../src/api/v1');
const er404 = require('../src/middleware/404');
const er500 = require('../src/middleware/500');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('docs'));
const options = require('../docs/config/swagger');
const expressSwagger = require ('express-swagger-generator')(app);
expressSwagger(options);

app.use(v1Router);

app.use(er404);
app.use(er500);

let start = (port = process.env.PORT) => {
  app.listenerCount(port, () => {
    console.log(`Running: ${port}`);
  });
};

module.exports = {app, start};