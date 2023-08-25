const User = require('../models/User');
const bcrypt = require('bcrypt');

const showForgetpassPage = (req, res) => {
  res.render('auth/forgetpass', { layout: 'login' }); // Render trang quên mật khẩu
};

const processForgetpassRequest = async (req, res) => {
  try {
    const { email } = req.body;

    // Kiểm tra sự tồn tại của người dùng với email cụ thể
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/forgetpass', { error: 'Không tìm thấy người dùng với email này', layout: 'login' });
    }

    // // Tạo mật khẩu tạm thời và lưu vào cơ sở dữ liệu
    // const temporaryPassword = Math.random().toString(36).substring(2, 10); // Tạo mật khẩu ngẫu nhiên
    // const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    // user.password = hashedPassword;
    // await user.save();

    // // Gửi email chứa mật khẩu tạm thời đến người dùng
    // // Code xử lý gửi email ở đây

    // return res.render('auth/login', { message: 'Mật khẩu tạm thời đã được gửi vào email của bạn', layout: 'login' });
  } catch (error) {
    return res.render('auth/forgetpass', { error: 'Có lỗi xảy ra', layout: 'login' });
  }
};

module.exports = {
  showForgetpassPage,
  processForgetpassRequest
};
