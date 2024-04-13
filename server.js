require('dotenv').config();
const express = require('express');
const httpStatus = require('http-status');

const viewRoute = require('./routes/view.route');
const userRoute = require('./routes/user.route');

const viewRoute = require('./routes/view.route');
const userRoute = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/auth', viewRoute);

app.use('/api/v1/users', userRoute);

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
