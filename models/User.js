const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  address: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  joiningDate: Date,
  dateOfBirth: Date,
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  designationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  resetToken: String,
  resetTokenExpiration: Date,
});


module.exports = mongoose.model('User', userSchema);
