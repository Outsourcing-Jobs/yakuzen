const express = require('express');
const router = express.Router();
const recentWorkController = require('../controllers/recentWork.controller');
const auth = require('../middleware/auth');

// Public route for home page
router.get('/', recentWorkController.getRecentWorks);

// Admin routes
router.get('/all', auth, recentWorkController.getAllRecentWorks);
router.post('/toggle', auth, recentWorkController.toggleRecentPool);
router.put('/:id/status', auth, recentWorkController.updateRecentWorkStatus);
router.put('/reorder', auth, recentWorkController.updateRecentWorksOrder);

module.exports = router;
