const Product = require('../models/Product');
const mongoose = require('mongoose');
const slugify = require('slugify');
const { cloudinary } = require('../config/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, description, isAvailable, order } = req.body;

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
      description,
      isAvailable,
      order: order || 0,
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
    const { category, limit } = req.query;
    const filter = {};

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      } else {
        // Nếu không phải ID hợp lệ, giả định là slug
        const Category = require('../models/Category');
        const foundCategory = await Category.findOne({ slug: category });
        if (foundCategory) {
          filter.category = foundCategory._id;
        } else {
          return res.json([]); // Không tìm thấy category với slug này
        }
      }
    }

    const query = Product.find(filter).sort({ order: 1, createdAt: -1 });
    if (limit) {
      query.limit(parseInt(limit));
    }

    const products = await query;

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

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Sort ảnh trước khi trả về
    if (product.images && product.images.length > 0) {
      product.images.sort((a, b) => a.order - b.order);
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, category, price, description, isAvailable, order, imageOrders } = req.body;

    // Parse imageOrders if it's a string (from FormData)
    if (typeof imageOrders === 'string') {
      try {
        imageOrders = JSON.parse(imageOrders);
      } catch (e) {
        imageOrders = [];
      }
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // 1. Cập nhật metadata đơn giản
    if (name) {
      product.name = name;
      product.slug = slugify(name, { lower: true, strict: true });
    }
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;
    if (order !== undefined) product.order = order;

    // 2. Xử lý xoá ảnh cũ nếu không có trong imageOrders
    if (Array.isArray(imageOrders)) {
      const currentImages = product.images || [];
      const imagesToDelete = currentImages.filter(img => 
        !imageOrders.some(o => o.public_id === img.public_id)
      );

      for (const img of imagesToDelete) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (err) {
          console.error(`Lỗi xoá ảnh ${img.public_id} trên Cloudinary:`, err);
        }
      }

      // Giữ lại những ảnh có trong imageOrders và cập nhật order của chúng
      product.images = currentImages.filter(img => 
        imageOrders.some(o => o.public_id === img.public_id)
      );

      product.images.forEach(img => {
        const found = imageOrders.find(o => o.public_id === img.public_id);
        if (found && found.order !== undefined) {
          img.order = found.order;
        }
      });
    }

    // 3. Thêm ảnh mới từ req.files
    if (req.files && req.files.length > 0) {
      const maxCurrentOrder = product.images.reduce((max, img) => Math.max(max, img.order || 0), -1);
      req.files.forEach((file, index) => {
        product.images.push({
          url: file.path,
          public_id: file.filename,
          order: maxCurrentOrder + 1 + index
        });
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
