const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, OrderController.createOrder);
router.get('/get-all-order/:id', authMiddleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', authMiddleware, OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', authMiddleware, OrderController.cancelOrderDetails)


module.exports = router