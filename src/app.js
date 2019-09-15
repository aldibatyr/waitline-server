/* eslint-disable strict */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./error-handler');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const lineRouter = require('./line/line-router');



const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/line', lineRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

module.exports = app;

