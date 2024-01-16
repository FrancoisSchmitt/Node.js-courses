const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

const adminData = require('./admin');
const isAuth = require('../middleware/is-auth')
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// // /products/2132

router.get('/products/:productId', shopController.getProducts);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCardDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;