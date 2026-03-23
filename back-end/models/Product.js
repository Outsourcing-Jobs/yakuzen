const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }, // Dùng để quản lý file trên Cloudinary (xóa/update)
  order: { type: Number, default: 0 },         // Số nhỏ nhất sẽ lên hình đầu tiên
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    images: [productImageSchema],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Sắp xếp mặc định ảnh theo thứ tự order
productSchema.pre('find', function () {
  this.populate('category', 'name slug');
});

module.exports = mongoose.model('Product', productSchema);
