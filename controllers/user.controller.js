const { query } = require("express");

const createUser = (req, res) => {
    const { fullname, email, password } = req.body;
    res.send({fullname, email, password});     
};

const getUser = (req, res) => {
    console.log(req.query);

    res.json({
        user: [],
        query: req.query
    });
};

const getUserById = (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    res.json({
        message: "Lấy thông tin người dùng có id ${userId} thành công"
    });
};

const upDateUserById = (req, res) => {
    const {userId} = req.params;
    const { fullname, password} = req.body;
    res.json({
        message: "Cập nhập thông tin người dùng có Id ${userId} thành công",
        fullname,
        password
    });
};

const deleteUserById = (req, res) => {
    const {userId} = req.params;
    res.json({
        message: "Xóa người dùng có Id ${userId} thành công",
    });
};

const lockUserById = (req, res) => {
    const {userId} = req.params;
    res.json({
        message: "Khóa người dùng Id ${userId} thành công",
    });
};

module.exports = {
    createUser,
    getUser, 
    getUserById,
    upDateUserById,
    deleteUserById,
    lockUserById,
}