const bcrypt = require('bcrypt');
const User = require('../models/User');


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo đối tượng người dùng mới với mật khẩu đã mã hóa
    const newUser = await User.create({ username, email, password: hashedPassword });

    // console.log(newUser)

    res.render('auth/login', {layout: "login"}); // Chuyển hướng đến trang đăng nhập sau khi đăng ký
  } catch (error) {
    res.render('/auth/register', { error: 'An error occurred', layout: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/login', { error: 'Invalid email or password', layout: 'login' });
    }

    // So sánh mật khẩu
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('auth/login', { error: 'Invalid email or password', layout: 'login' });
    }

    // Thực hiện đăng nhập thành công
    // Lưu thông tin người dùng vào session hoặc thực hiện các thao tác khác
    // Đánh dấu người dùng đã đăng nhập
    req.session.isLoggedIn = true;
  // Điều hướng đến trang sau khi đăng nhập thành công
  return res.redirect('/');
  } catch (error) {
    const errorMessage = 'An error occurred';
    return res.render('auth/login', { error: errorMessage, layout: 'login' }); // Không sử dụng layout
  }
};

module.exports = {
  register,
  login
};
