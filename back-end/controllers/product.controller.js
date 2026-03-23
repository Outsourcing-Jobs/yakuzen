const Product = require('../models/Product');
const slugify = require('slugify');
const { cloudinary } = require('../config/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, discountPrice, description, isAvailable } = req.body;
    
    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Tên, Category và Giá là bắt buộc' });
    }

    let slug = slugify(name, { lower: true, strict: true });
    // Handle duplicated slug
    const exist = await Product.findOne({ slug });
    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    // Xử lý upload files từ multer-storage-cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        images.push({
          url: file.path,
          public_id: file.filename,
          order: index // mặc định ảnh đầu sẽ có order 0
        });
      });
    }

    const newProduct = new Product({
      name,
      slug,
      category,
      price,
      discountPrice,
      description,
      isAvailable,
      images,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Có thể thêm filter category ở đây nếu truyền ?category=...
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    
    // Sort ảnh trước khi trả về
    products.forEach(p => {
      if (p.images && p.images.length > 0) {
        p.images.sort((a, b) => a.order - b.order);
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, discountPrice, description, isAvailable, imageOrders } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    if (name) {
      product.name = name;
      product.slug = slugify(name, { lower: true, strict: true });
    }
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (description !== undefined) product.description = description;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;

    // Cập nhật thứ tự ảnh (nhận array imageOrders: [{ public_id, order }, ...])
    if (imageOrders && Array.isArray(imageOrders)) {
      product.images.forEach(img => {
        const found = imageOrders.find(o => o.public_id === img.public_id);
        if (found && found.order !== undefined) {
          img.order = found.order;
        }
      });
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // Xóa ảnh trên Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne(); // Mongoose 8 xài deleteOne thay remove
    res.json({ message: 'Đã xóa sản phẩm và ảnh' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
