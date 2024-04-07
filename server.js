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

app.get('/api/v1/users/:userId', (req, res) => {
  // tiếp theo xử lý lấy dữ liệu trong db

  // giải quyết vấn đề tìm kiếm chi tiết
  const { userId } = req.params;
  res.send(userId);
});

app.get('/api/v1/users', (req, res) => {
  console.log(req.query);
  // giải quyết vấn đề tìm kiếm
  res.send(req.query);
});

app.post('/api/v1/users', (req, res) => {
  const { fullname, email } = req.body;
  res.send({ fullname, email });
});

app.use('/auth', viewRoute);

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// post get put delete
// create - post
// get - lấy dữ liệu
// put/patch - sử dụng để thay đổi dữ liệu
// delete - xóa dữ liệu
