const httpStatus = require('http-status');

const createUser = (req, res) => {
    res.status(httpStatus.OK).send({
        message:'Tạo người dùng thành công',
        code: httpStatus.OK,
        data: req.body,
    });
}
const getUsers = (req, res) => {
    res.status(httpStatus.OK).send({
        message:'Lấy người dùng thành công',
        code: httpStatus.OK,
        data: [],
        query: req.query
    })
} 
const getUserById = (req,res) => {
    const {userId} = req.params;    
    res.status(httpStatus.OK).send(
        {
            message: `Lấy thông tin người dùng có Id ${userId} thành công`,
            code: httpStatus.OK
        }
    )
}

const updateUserById = (req,res) => {
    const {fullname, password} = req.body;
    const {userId} = req.params;
    res.status(httpStatus.OK).send(
        {
            message: `Cập nhật thông tin người dùng có Id ${userId} thành công`,
            code:httpStatus.OK,
            data: {
                fullname,
                password,
            }
        }
    )
}

const deleteUserById = (req, res) => {
    const {userId} = req.params;
    res.status(httpStatus.OK).send({
        message: `Xoá người dùng có Id ${userId} thành công`,
        code: httpStatus.OK
    })
}

const lockUserById = (req, res) => {
    const {userId} = req.params;
    res.status(httpStatus.OK).send({
        message: `Khoá người dùng có Id ${userId} thành công`,
        code: httpStatus.OK
    })
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    lockUserById
} 
