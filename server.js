const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes'); 
const announcementRoutes = require('./routes/announcementRoutes');
const crypto = require('crypto');
const cors = require('cors');



// Generate a random JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
// Log the generated JWT secret to the console
console.log('JWT Secret:', jwtSecret);

// Store the JWT secret in the environment variables or configuration file
process.env.JWT_SECRET = jwtSecret;


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);
app.use('/designations', designationRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leave', leaveRoutes); 
app.use('/announcements', announcementRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
