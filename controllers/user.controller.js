const createUser = (req, res) => {
    const { fullname, email, password } = req.body;
    res.json({ "fullname ": fullname, "email ": email, "password ": password });
};

const getUsers = (req, res) => {
    const query = req.query;
    res.json({
        users: [],
        queries: query
    });
};

const getUserById = (req, res) => {
    const { userId } = req.params;
    res.json({ success: true, message: `Lấy thông tin người dùng có Id ${userId} thành công!` });
};

const updateUserById = (req, res) => {
    const {userId} = req.params;
    const {fullname, password} = req.body;
    res.json({success: true, message: `Cập nhật thông tin người dùng có Id ${userId} thành công`, "fullname ": fullname, "password ": password});
};

const deleteUserById = (req, res) => {
    const {userId} = req.params;
    res.json({success: true, message: `Xoá người dùng có Id ${userId} thành công!`});
};

const lockUserById = (req, res) => {
    const {userId} = req.params;
    res.json({success: true, message: `Khoá người dùng có Id ${userId} thành công!`});
};

module.exports = { createUser, getUsers, getUserById, updateUserById, deleteUserById, lockUserById }
