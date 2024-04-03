const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/', authenticateToken, announcementController.getAllAnnouncements);
router.get('/:id', authenticateToken, announcementController.getAnnouncementById);

// Routes accessible only by admins
router.post('/', authenticateToken, announcementController.createAnnouncement);
router.put('/:id', authenticateToken, announcementController.updateAnnouncement);
router.delete('/:id', authenticateToken, announcementController.deleteAnnouncement);

module.exports = router;
