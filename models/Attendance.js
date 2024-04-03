const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  finishTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Leave'],
    default: 'Present',
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
