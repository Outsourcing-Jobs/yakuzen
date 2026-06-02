const RecentWorkImage = require('../models/RecentWorkImage');
const Setting = require('../models/Setting');
const { cloudinary } = require('../config/cloudinary');

// Get active recent work images (Public)
exports.getRecentWorkImages = async (req, res) => {
  try {
    const limitSetting = await Setting.findOne({ key: 'recent_works_limit' });
    const limit = limitSetting ? parseInt(limitSetting.value) : 10;

    const works = await RecentWorkImage.find({ isVisible: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit);

    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all recent work images (Admin)
exports.getAllRecentWorkImages = async (req, res) => {
  try {
    const works = await RecentWorkImage.find().sort({ order: 1, createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new recent work image item (Admin)
exports.createRecentWorkImage = async (req, res) => {
  try {
    const { title, description, link, isVisible, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng tải lên một hình ảnh' });
    }

    const newWork = new RecentWorkImage({
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      title,
      description,
      link,
      isVisible: isVisible !== undefined ? isVisible === 'true' || isVisible === true : true,
      order: order ? parseInt(order) : 0,
    });

    await newWork.save();
    res.status(201).json(newWork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an existing recent work image (Admin)
exports.updateRecentWorkImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, isVisible, order } = req.body;

    const work = await RecentWorkImage.findById(id);
    if (!work) {
      return res.status(404).json({ message: 'Không tìm thấy mục Recent Work Image' });
    }

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (work.image && work.image.public_id) {
        try {
          await cloudinary.uploader.destroy(work.image.public_id);
        } catch (cloudinaryErr) {
          console.error('Lỗi khi xóa ảnh cũ trên Cloudinary:', cloudinaryErr);
        }
      }

      work.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Update other fields if they are in request body
    if (title !== undefined) work.title = title;
    if (description !== undefined) work.description = description;
    if (link !== undefined) work.link = link;
    if (isVisible !== undefined) {
      work.isVisible = isVisible === 'true' || isVisible === true;
    }
    if (order !== undefined) work.order = parseInt(order);

    await work.save();
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a recent work image (Admin)
exports.deleteRecentWorkImage = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await RecentWorkImage.findById(id);

    if (!work) {
      return res.status(404).json({ message: 'Không tìm thấy mục Recent Work Image' });
    }

    // Delete image from Cloudinary if it exists
    if (work.image && work.image.public_id) {
      try {
        await cloudinary.uploader.destroy(work.image.public_id);
      } catch (cloudinaryErr) {
        console.error('Lỗi khi xóa ảnh trên Cloudinary:', cloudinaryErr);
      }
    }

    await RecentWorkImage.deleteOne({ _id: id });
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle visibility status (Admin)
exports.updateRecentWorkImageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    const work = await RecentWorkImage.findById(id);
    if (!work) return res.status(404).json({ message: 'Không tìm thấy' });

    work.isVisible = isVisible;
    await work.save();

    res.json(work);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order of multiple items (Admin)
exports.updateRecentWorkImagesOrder = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }

    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Orders phải là một mảng' });
    }

    const promises = orders.map(item =>
      RecentWorkImage.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(promises);
    res.json({ message: 'Cập nhật thứ tự thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
