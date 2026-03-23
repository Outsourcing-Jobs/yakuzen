const mongoose = require('mongoose');

const tosSectionSchema = new mongoose.Schema({
  badge: { type: String, default: '' },       // vd: "READ FIRST", "QUEUE"
  heading: { type: String, required: true },  // vd: "IMPORTANT RULES"
  subheading: { type: String, default: '' }, 
  contentBlocks: [{ type: String }],          // Chứa mảng HTML Strings cho mỗi thẻ <p> hoặc <li>
  order: { type: Number, default: 0 }         // Thứ tự hiển thị section
});

const tosCtaSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: '◈' },       // Icon ký tự như trên UI
  order: { type: Number, default: 0 }
});

const tosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'TERMS OF SERVICE',
    },
    // Các phần nội dung quy định, waitlist...
    sections: [tosSectionSchema],
    // Nút điều hướng cuối cùng
    ctaLinks: [tosCtaSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TOS', tosSchema);
