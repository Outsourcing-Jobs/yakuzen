const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth'); // Có thể dùng cho route admin 

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory); // Nên bọc auth và requireAdmin sau
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
