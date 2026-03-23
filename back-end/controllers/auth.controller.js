const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Đăng ký đơn giản
exports.register = async (req, res) => {
  try {
    const { email, phone, password, name } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: 'Vui lòng cung cấp Email hoặc Số điện thoại' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu' });
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

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'yakuzen_secret_key', { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
