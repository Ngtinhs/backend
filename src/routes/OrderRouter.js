const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder);


module.exports = router