const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can create projects' });
    }
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can access all projects' });
    }
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('assignedEmployees');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectsByUserId = async (req, res) => {
  try {
    const projects = await Project.find({ assignedEmployees: req.params.userId });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update projects' });
    }
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete projects' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};