const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/', authenticateToken, leaveController.getAllLeave);
router.get('/:id', authenticateToken, leaveController.getLeaveById);

// Routes accessible by users
router.post('/', authenticateToken, leaveController.applyLeave);

// Routes accessible only by admins
router.put('/:id/approve', authenticateToken, leaveController.approveLeave);
router.put('/:id/reject', authenticateToken, leaveController.rejectLeave);

module.exports = router;
