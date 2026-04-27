const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Đăng ký đơn giản
exports.register = async (req, res) => {
  try {
    const { email, phone, password, name, role, adminKey } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: 'Vui lòng cung cấp Email hoặc Số điện thoại' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu' });
    }

    // Role check for admin
    let userRole = 'user';
    if (role === 'admin') {
      const serverAdminKey = process.env.ADMIN_SECRET_KEY;
      if (adminKey !== serverAdminKey) {
        return res.status(403).json({ message: 'Admin Secret Key không chính xác' });
      }
      userRole = 'admin';
    }

    // Kiểm tra tồn tại
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email || undefined,
      phone: phone || undefined,
      password: hashedPassword,
      name,
      role: userRole,
    });

    await newUser.save();


    res.status(201).json({ message: 'Đăng ký thành công', user: { id: newUser._id, name: newUser.name, role: newUser.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tài khoản (Email/Phone) và mật khẩu' });
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Tạo Access Token (Ngắn hạn - vd: 1h)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'yakuzen_secret_key', { 
      expiresIn: process.env.JWT_EXPIRES_IN || '1h' 
    });

    // Tạo Refresh Token (Dài hạn - vd: 30d)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'yakuzen_refresh_secret_key', { 
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d' 
    });

    // Lưu Refresh Token vào DB
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ 
        token: accessToken, 
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token là bắt buộc' });
    }

    // Kiểm tra token trong DB
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Refresh Token không hợp lệ hoặc đã bị thu hồi' });
    }

    // Verify token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'yakuzen_refresh_secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh Token đã hết hạn, vui lòng đăng nhập lại' });
      }

      // Tạo Access Token mới
      const payload = {
        user: {
          id: user._id,
          role: user.role,
        },
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'yakuzen_secret_key', { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1h' 
      });

      res.json({ token: accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đăng xuất
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
    res.json({ message: 'Đăng xuất thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
