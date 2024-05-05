require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const viewRoute = require('./routes/view.route');
const userRoute = require('./routes/user.route');
const classRoute = require('./routes/class.route');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/db-giang';

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));

app.use('/auth', viewRoute);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/classes', classRoute);

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
