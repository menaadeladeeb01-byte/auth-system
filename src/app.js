require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.route');
const errorHandler = require('./middlewares/error.middleware.js');


const app = express();
app.use (express.json());
app.use (morgan('dev'));
app.use('/auth', authRoutes);



app.use(errorHandler);

module.exports = app ;

