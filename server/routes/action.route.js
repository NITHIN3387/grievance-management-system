const express = require('express');
const { uploadStatus, getStatus, updateStatus } = require('../controllers/action.controller'); // Import your actions controller
const uploader = require('../middleware/multer');

const router = express.Router();

// Define routes for the "actions" table
router.post('/upload', uploadStatus); // Route for uploading an action
router.get('/get/:id', getStatus); // Route for getting the status of the complaint
router.put('/update/:id', uploader.single("action-image"), updateStatus); // Route for getting the status of the complaint

module.exports = router;