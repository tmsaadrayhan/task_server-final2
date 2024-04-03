const Designation = require('../models/Designation');

exports.createDesignation = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can create designations' });
    }
    const newDesignation = await Designation.create(req.body);
    res.status(201).json(newDesignation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllDesignations = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can access all designations' });
    }
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.status(200).json(designation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllDesignationsByDepartmentId = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can access all designations' });
    }
    const designations = await Designation.find({ departmentId: req.params.departmentId });
    res.status(200).json(designations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update designations' });
    }
    await Designation.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Designation updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete designations' });
    }
    await Designation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Designation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
