const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center;" >Hello World! 🌱 HIT NodeJS 2024</h1>`
  );
});

const users = [
  {
    id: 1,
    name: "user1",
  },
  {
    id: 2,
    name: "user2",
  },
  {
    id: 3,
    name: "user3",
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
