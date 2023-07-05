const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.UpdateUser);
router.delete('/delete-user/:id', authMiddleware, userController.DeteleUser);
router.get('/getAll', authMiddleware, userController.getAllUser);
router.get('/get-details/:id', userController.getDetailsUser);

module.exports = router