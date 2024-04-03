const express = require("express");
require("dotenv").config();
const path = require("path");
const httpStatus = require('http-status');

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center;">Hello World! 🌱 HIT NodeJS 2024</h1>`
  );
});

app.get("/download", (req, res) => {
  res.download(`${__dirname}/data.txt`);
})

app.get("/redirect", (req, res) => {
  res.redirect("/download");
})

app.get("/send", (req, res) => {
  res.render("index", { users: users });
  console.log(path);
})

app.get("/auth/login", (req, res) => {
  res.render("pages/login");
  console.log(path);
})

app.get('/auth/register', (req, res) => {
  res.render('pages/register')
});

app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Not found',
    code: httpStatus.NOT_FOUND
  })
})

const users = [
  {
    id: 1,
    name: "user1",
    status: 1
  },
  {
    id: 2,
    name: "user2",
    status: 0
  },
  {
    id: 3,
    name: "user3",
    status: 1
  },
];

app.get("/api/v1/users", (req, res) => {
  res.send({
    code: 200,
    message: "Lấy danh sách người dùng thành công",
    data: {
      users,
      total: users.length,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
