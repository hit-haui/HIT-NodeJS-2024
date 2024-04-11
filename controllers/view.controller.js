const loginPage = (req, res) => {
  res.render('pages/login' ,{title : 'Login page - BTVN Buổi 4'});
}

const registerPage = (req, res) => {
  res.render('pages/register', {title : 'Register page - BTVN Buổi 4'});
}

module.exports = {
    loginPage,
    registerPage
};
