const express = require('express');

const uploader = require('../middleware/multer');
const authUser = require('../middleware/authUser.middleware')

const { uploadStatus, getStatusByComplaintId, updateStatus, getStatusByUserId } = require('../controllers/action.controller'); // Import your actions controller

const router = express.Router();

// Define routes for the "actions" table
router.post('/upload', uploadStatus); // Route for uploading an action
router.get('/get/:id', getStatusByComplaintId); // Route for getting the status of the complaint by complaint id
router.get('/get', authUser, getStatusByUserId); // Route for getting the status of the complaint uploaded by the auth user
router.put('/update/:id', uploader.single("action-image"), updateStatus); // Route for getting the status of the complaint

module.exports = router;