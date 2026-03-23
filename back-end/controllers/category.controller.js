const Category = require('../models/Category');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });

    let slug = slugify(name, { lower: true, strict: true });
    
    // Check exist
    const exist = await Category.findOne({ slug });
    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    const newCategory = new Category({ name, slug, description });
    await newCategory.save();
    
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục' });

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true });
    }
    if (description !== undefined) {
      category.description = description;
    }

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Đã xóa danh mục' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
