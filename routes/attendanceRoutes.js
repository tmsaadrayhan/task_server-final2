const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/', authenticateToken, attendanceController.getAllAttendance);
router.get('/:userId', authenticateToken, attendanceController.getAttendanceByUserId);

// Route accessible only by admins

router.post('/', authenticateToken, attendanceController.createAttendance);
router.put('/:id', authenticateToken, attendanceController.updateAttendance);
router.delete('/:id', authenticateToken, attendanceController.deleteAttendance);

module.exports = router;


// Routes accessible by users
router.post('/', authenticateToken, attendanceController.createAttendance);
router.post('/punch-in', authenticateToken, attendanceController.punchIn);
router.post('/punch-out', authenticateToken, attendanceController.punchOut);



module.exports = router;
