const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
  try {
    const newAttendance = await Attendance.create(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find();
    res.status(200).json(allAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    await Attendance.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAttendanceByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; //  userId is passed as a parameter in the URL
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    if (req.user.userId !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const userAttendance = await Attendance.find({ userId });
    res.status(200).json(userAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.punchIn = async (req, res) => {
  try {
    const userId = req.user.userId;
    const existingAttendance = await Attendance.findOne({ userId, finishTime: null });
    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already punched in' });
    }
    const newAttendance = new Attendance({ userId, startTime: new Date() });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.punchOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const existingAttendance = await Attendance.findOne({ userId, finishTime: null });
    if (!existingAttendance) {
      return res.status(400).json({ message: 'You have not punched in yet' });
    }
    existingAttendance.finishTime = new Date();
    await existingAttendance.save();
    res.status(200).json({ message: 'Punched out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
