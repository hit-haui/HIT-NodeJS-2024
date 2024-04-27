require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const httpStatus = require('http-status');

const viewRoute = require('./routes/view.route');
const userRoute = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db-Hang"

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

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("mongoDB connected");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
  )
  .catch((error) => console.log(error));

// (async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("mongoDB connected")
//   } catch (error) {
//     console.log(error);
//   }
// })();

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
