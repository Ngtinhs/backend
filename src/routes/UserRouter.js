const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/sign-out', userController.logoutUser);
router.put('/update-user/:id', authMiddleware, userController.UpdateUser);
router.delete('/delete-user/:id', authMiddleware, userController.DeteleUser);
router.get('/getAll', authMiddleware, userController.getAllUser);
router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/delete-many', authMiddleware, userController.deleteMany)

module.exports = router