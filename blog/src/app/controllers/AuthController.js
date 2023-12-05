const bcrypt = require('bcrypt');
const User = require('../Models/User');


const register = async (req, res) => {
  try { 
    const { username, email, password } = req.body;

    // Kiểm tra xem địa chỉ email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', { error: 'Email đã tồn tại. Vui lòng đăng ký tài khoản bằng email khác!', layout: 'register' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo đối tượng người dùng mới với mật khẩu đã mã hóa
    const newUser = await User.create({ username, email, password: hashedPassword });

     res.render('auth/login', {layout: "login"}); // Chuyển hướng đến trang đăng nhập sau khi đăng ký
  } catch (error) {
    res.render('/auth/register', { error: 'An error occurred', layout: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/login', { error: 'Email hoặc mật khẩu không hợp lệ', layout: 'login' });
    }

    // So sánh mật khẩu
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) { 
      return res.render('auth/login', { error: 'Email hoặc mật khẩu không hợp lệ', layout: 'login' });
    }

    // Thực hiện đăng nhập thành công
    // Lưu thông tin người dùng vào session
    // Đánh dấu người dùng đã đăng nhập
    req.session.user = {
      userId: user._id,
      username: user.username, // Lấy tên người dùng từ cơ sở dữ liệu
      password: user.email,       // Lấy email người dùng từ cơ sở dữ liệu
    }
    req.session.authenticated = true
    // Điều hướng đến trang sau khi đăng nhập thành công
    // return res.render("home")
   
    await req.session.save();// Lưu lại trang thái sesion
    return res.redirect("/");

    //return res.redirect(`/?authenticated=${req.session.authenticated}`)
    // req.session.save(function(err) {
    //   console.log(req.session.authenticated)
    //   res.redirect("/")
    // })

    // return res.render("home", { user: req.session.user});

  } catch (error) {
    const errorMessage = 'An error occurred';
    return res.render('auth/login', { error: errorMessage, layout: 'login' }); // Không sử dụng layout
  }
};

const logout = async (req, res) => {
  try {
    // Xóa thông tin phiên khi người dùng đăng xuất
    req.session.destroy(async (err) => {
      if (err) {
        console.error('Lỗi xóa session:', err);
      } else {
        console.log('Session đã được xóa.');
        await res.clearCookie();
        console.log("chay vao day");
      // Sau khi xóa session, chuyển hướng người dùng đến trang đăng nhập
        return res.redirect('/auth/login');
      }
      // Xóa session cookie
      
    });
  } catch (error) {
    const errorMessage = 'An error occurred';
    return res.render('auth/login', { error: errorMessage, layout: 'login' });
  }
};

module.exports = {
  register, 
  login, 
  logout
};
