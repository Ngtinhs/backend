const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, OrderController.createOrder);
router.get('/get-order-details/:id', authMiddleware, OrderController.getDetailsOrder)


module.exports = router