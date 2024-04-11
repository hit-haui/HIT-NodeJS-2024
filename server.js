const httpStatus = require('http-status');
const express = require('express');
require('dotenv').config();

const viewRoute = require("./routes/view.route");
const userRoute = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());  //su dung req.body phai them middleware nay

app.use('/api/v1/users', userRoute);
// app.get('/api/v1/users/:userId', (req, res) => {
//   //xu ly lay du lieu trong db

//   //xu ly van de tim kiem
//   const {userId} = req.params;
//   res.send(userId);
// });

// app.get('/api/v1/users', (req, res) => {
//   //giai quyet van de tim kiem chi tiet
//   res.send(req.query);
// });

// app.post('/api/v1/users', (req, res) => {
//   res.send(req.body);
// });


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
