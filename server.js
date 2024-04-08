const httpStatus = require('http-status');
const express = require('express');
require('dotenv').config();

const viewRoute = require('./routes/view.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/auth', viewRoute);

app.get('/api/v1/users/:id', (req, res) => {
  console.log(req.params.id);
  let { id } = req.params;
  res.send(id);
})

app.get('/api/v1/users', (req, res) => {
  console.log(req.query);
  res.send(req.query);
})

app.post('/api/v1/users', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.send(req.body);
})

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
