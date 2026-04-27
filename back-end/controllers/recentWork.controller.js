const RecentWork = require('../models/RecentWork');
const Product = require('../models/Product');
const Setting = require('../models/Setting');

// Get only active recent works (Public)
exports.getRecentWorks = async (req, res) => {
  try {
    // Get limit from settings
    const limitSetting = await Setting.findOne({ key: 'recent_works_limit' });
    const limit = limitSetting ? parseInt(limitSetting.value) : 10;

    const works = await RecentWork.find({ isVisible: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .populate({
        path: 'product',
        populate: { path: 'category', select: 'name' }
      });

    // Map to simple structure for frontend if needed, but let's keep it consistent
    const activeProducts = works.map(w => w.product).filter(p => p != null);
    
    res.json(activeProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all items in the pool (Admin)
exports.getAllRecentWorks = async (req, res) => {
  try {
    const works = await RecentWork.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('product');
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle product in/out of the pool
exports.toggleRecentPool = async (req, res) => {
  try {
    const { productId } = req.body;
    const existing = await RecentWork.findOne({ product: productId });

    if (existing) {
      await RecentWork.deleteOne({ _id: existing._id });
      return res.json({ message: 'Removed from pool', inPool: false });
    } else {
      const newWork = new RecentWork({ product: productId });
      await newWork.save();
      return res.status(201).json({ message: 'Added to pool', inPool: true, data: newWork });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle visibility status
exports.updateRecentWorkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;
    
    const work = await RecentWork.findById(id);
    if (!work) return res.status(404).json({ message: 'Not found' });

    work.isVisible = isVisible;
    await work.save();
    
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order
exports.updateRecentWorksOrder = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }
    
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Orders must be an array' });
    }

    const promises = orders.map(item => 
      RecentWork.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(promises);
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
