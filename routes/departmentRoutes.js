const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/:id', authenticateToken, departmentController.getDepartmentById);

// Routes accessible only by admins
router.post('/', authenticateToken, departmentController.createDepartment);
router.put('/:id', authenticateToken, departmentController.updateDepartment);
router.delete('/:id', authenticateToken, departmentController.deleteDepartment);

// Route to get all departments (accessible only by admins)
router.get('/', authenticateToken, departmentController.getAllDepartments);

module.exports = router;
