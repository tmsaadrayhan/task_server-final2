const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from authenticated user
    const { department, leaveType, startDate, finishDate } = req.body;
    
    // Create leave application for the authenticated user
    const newLeave = await Leave.create({ userId, department, leaveType, startDate, finishDate });
    res.status(201).json(newLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllLeave = async (req, res) => {
  try {
    const allLeave = await Leave.find();
    res.status(200).json(allLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getLeaveById = async (req, res) => {
  try {
    // Check if the authenticated user is an admin or the owner of the leave application
    const { userId } = req.user; // Extract userId from authenticated user
    const leave = await Leave.findOne({ _id: req.params.id, userId }).populate('userId');
    if (!leave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }
    res.status(200).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can approve leave applications' });
    }
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.status(200).json({ message: 'Leave application approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectLeave = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can reject leave applications' });
    }
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.status(200).json({ message: 'Leave application rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
