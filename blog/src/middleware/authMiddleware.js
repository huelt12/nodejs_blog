
exports.isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
      next(); // Cho phép truy cập nếu đã đăng nhập
    } else {
      res.redirect('/login'); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
    }
  };
  