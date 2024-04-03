const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/:id', authenticateToken, taskController.getTaskById);

// Route to get all tasks assigned to a single user by userId (accessible by both admin and users)
router.get('/user/:userId', authenticateToken, taskController.getAllTasksByUserId);

// Routes accessible only by admins
router.post('/', authenticateToken, taskController.createTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

// Route to get all tasks (accessible only by admins)
router.get('/', authenticateToken, taskController.getAllTasks);

// Route to get all tasks by projectId
router.get('/project/:projectId', authenticateToken, taskController.getAllTasksByProjectId);

module.exports = router;
