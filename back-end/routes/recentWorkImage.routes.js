const express = require('express');
const router = express.Router();
const recentWorkImageController = require('../controllers/recentWorkImage.controller');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public route to get active items
router.get('/', recentWorkImageController.getRecentWorkImages);

// Admin CRUD routes
router.get('/all', auth, recentWorkImageController.getAllRecentWorkImages);
router.post('/', auth, upload.single('image'), recentWorkImageController.createRecentWorkImage);
router.put('/:id', auth, upload.single('image'), recentWorkImageController.updateRecentWorkImage);
router.delete('/:id', auth, recentWorkImageController.deleteRecentWorkImage);
router.put('/:id/status', auth, recentWorkImageController.updateRecentWorkImageStatus);
router.put('/reorder', auth, recentWorkImageController.updateRecentWorkImagesOrder);

module.exports = router;
