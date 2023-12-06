const isAuth = async (req, res, next) => {
  console.log("Auth middleware")

  if (!req.session.authenticated) {
    // console.log("abc");
    return next(); // Chuyển lại vềs đăng nhập nếu chưa đăng nhập
  }

  // check logic đúng, truyển tham số xuống dưới
  res.locals.authenticated = req.session.authenticated;


  // return res.render('home'); // Đã đăng nhập, chuyển hướng
  return res.render('home', { authenticated: req.session.authenticated });

};
 
module.exports = {
  isAuth
};


