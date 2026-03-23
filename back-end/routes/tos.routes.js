const express = require('express');
const router = express.Router();
const tosController = require('../controllers/tos.controller');

router.get('/', tosController.getTOS);
router.put('/', tosController.updateTOS); // Nên có middleware admin sau: auth, requireAdmin

module.exports = router;
