require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const viewRoute = require('./routes/view.route');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const classRoute = require('./routes/class.route');

const upload = require('./middlewares/multer.middleware');
const errorHandler = require('./middlewares/error.middleware');
const {auth} = require("./middlewares/auth.middleware");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hit-nodejs-2024';

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', auth, (req, res) => {
  return res.send({
    user: req.user,
  })
});

app.use(morgan('dev'));

// view
app.use('/auth', viewRoute);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/classes', classRoute);

app.post('/uploads', upload.single('file'), (req, res) => {
  const urlPublic = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.send({
    message: 'File uploaded successfully',
    urlPublic,
  });
});

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

app.use(errorHandler);

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
