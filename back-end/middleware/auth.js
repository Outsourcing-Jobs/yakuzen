const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Lấy token từ header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token, từ chối truy cập' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yakuzen_secret_key');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
