const loginPage = (req, res) => {
    res.render('pages/login', { title: 'Login' })
}

const registerPage = (req, res) => {
    res.render('pages/register', { title: 'Register' })
}

module.exports = {
    loginPage,
    registerPage
}