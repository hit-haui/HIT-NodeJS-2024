const loginPage = (req, res) => {
    res.render('pages/login', {title: 'Login page'})
};

const registerPage = (req, res) => {
    res.render('pages/register', {title: 'Register page'})
};

module.exports = {loginPage, registerPage }
