const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();

    res.json({
      users: userCount,
      products: productCount,
      categories: categoryCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
