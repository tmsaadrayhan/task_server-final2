const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    // Check if the authenticated user is an admin or assigned to the project
    if (!req.user.isAdmin && !req.body.assignedEmployees.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can access all tasks' });
    }
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedEmployees');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Check if the authenticated user is an admin or assigned to the task
    if (!req.user.isAdmin && !task.assignedEmployees.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedEmployees: req.params.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllTasksByProjectId = async (req, res) => {
  try {
    // Check if the authenticated user is an admin or assigned to the project
    if (!req.user.isAdmin && !req.user.projects.includes(req.params.projectId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Check if the authenticated user is an admin or assigned to the task
    if (!req.user.isAdmin && !task.assignedEmployees.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Check if the authenticated user is an admin or assigned to the task
    if (!req.user.isAdmin && !task.assignedEmployees.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
