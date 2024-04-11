const createUser = (req, res) => {
    const { fullName, email, password } = req.body;
    res.json({ fullName, email, password });
}

const getUsers = (req, res) => {
    const reqQuery = req.query;
    res.json({
        users: [],
        queries: reqQuery
    });
}

const getUserById = (req, res) => {
    const { userId } = req.params;
    res.json({
        message: `Lấy thông tin người dùng có Id ${userId} thành công`
    });
}

const updateUserById = (req, res) => {
    const { userId } = req.params;
    const { fullName, password } = req.body;
    res.json({
        message: `Cập nhật thông tin người dùng có Id ${userId} thành công`,
        fullName,
        password
    });
}

const deleteUserById = (req, res) => {
    const { userId } = req.params;
    res.json({
        message: `Xoá người dùng có Id ${userId} thành công`
    });
}

const lockUserById = (req, res) => {
    const { userId } = req.params;
    res.json({
        message: `Khoá người dùng có Id ${userId} thành công`
    });
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    lockUserById
}
