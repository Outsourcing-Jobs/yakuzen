const express = require('express');
const router = express.Router();
const settingController = require('../controllers/Setting.controller');

// In a real app, you'd add auth middleware for the PUT route
router.get('/:key', settingController.getSetting);
router.put('/:key', settingController.updateSetting);

module.exports = router;
