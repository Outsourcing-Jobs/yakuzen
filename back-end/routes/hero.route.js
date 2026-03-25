const express = require('express');
const router = express.Router();
const heroController = require('../controllers/hero.controller');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', heroController.getHero);
router.put('/', auth, upload.single('avatar'), heroController.updateHero);

module.exports = router;
