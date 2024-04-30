require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const viewRoute = require('./routes/view.route');
const userRoute = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 3000;
<<<<<<< HEAD
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/db-Hang';
=======
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/db-giang';
>>>>>>> cce3895b839e12105af31622b5ab626629b0d96a

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));

app.use('/auth', viewRoute);

app.use('/api/v1/users', userRoute);

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
<<<<<<< HEAD
=======

// (async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.log(error);
//   }
// })();
>>>>>>> cce3895b839e12105af31622b5ab626629b0d96a
