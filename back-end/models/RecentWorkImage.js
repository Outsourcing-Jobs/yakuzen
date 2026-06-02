const mongoose = require('mongoose');

const recentWorkImageSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      public_id: { type: String },
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    isVisible: {
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

module.exports = mongoose.model('RecentWorkImage', recentWorkImageSchema);
