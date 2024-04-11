const httpStatus = require('http-status');

const createUser = (req, res) => {
  const { fullName, email, password } = req.body;
  res.status(httpStatus.OK).json({ fullName, email, password });
};

const getUsers = (req, res) => {
  const users = [];
  const query = req.query;
  res.status(httpStatus.OK).json({ users, query });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  res.status(httpStatus.OK).json(`Lấy thông tin người dùng có Id ${userId} thành công`);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { fullName, password } = req.body;
  res
    .status(httpStatus.OK)
    .json({ message: `Cập nhật thông tin người dùng có Id ${userId} thành công`, fullName, password });
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;
  res.status(httpStatus.OK).json(`Xoá người dùng có Id ${userId} thành công`);
};

const lockUserById = (req, res) => {
  const { userId } = req.params;
  res.status(httpStatus.OK).json(`Khoá người dùng có Id ${userId} thành công`);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
};
