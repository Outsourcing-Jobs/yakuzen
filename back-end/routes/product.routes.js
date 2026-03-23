const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { upload } = require('../config/cloudinary');

router.get('/', productController.getProducts);

// API tạo mới sản phẩm với tối đa 5 ảnh
router.post('/', upload.array('images', 5), productController.createProduct);

router.put('/:id', productController.updateProductDetails);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
