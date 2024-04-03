const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware'); 

// Routes accessible by authenticated users
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);

// Route to get user by userId only by admin
router.get('/user/:userId', authenticateToken, isAdmin, userController.getUserByUserId);

// Routes accessible only by admin
router.delete('/:id', authenticateToken, isAdmin, userController.deleteUser);
router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

module.exports = router;