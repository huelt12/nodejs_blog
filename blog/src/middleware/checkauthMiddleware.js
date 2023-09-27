const checkAuth = (req, res, next) => {
    if (!req.session.authenticated) {
        return res.redirect('/bookstore'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
    next(); // Tiếp tục nếu đã đăng nhập
};
