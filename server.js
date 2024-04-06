const httpStatus = require('http-status');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'John',
      isLocked: false,
    },
    {
      id: 2,
      name: 'Mika',
      isLocked: true,
    },
    {
      id: 3,
      name: 'Kenvin',
      isLocked: false,
    },
  ];
  res.render('pages/index', { users });
});

app.get('/auth/login', (req, res) => {
  res.render('pages/login')
});

app.get('/auth/register', (req, res) => {
  res.render('pages/register')
});
app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});