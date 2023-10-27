const express = require('express');
const uploader = require('../middleware/multer'); // If needed for file uploads
const { uploadStatus, getActions } = require('../controllers/addAction.controller'); // Import your actions controller
const authAdmin = require('../middleware/authAdmin.middleware'); // If needed for authentication

const router = express.Router();

// Define routes for the "actions" table
router.post('/upload', uploadStatus); // Route for uploading an action
router.get('/get', authAdmin, getActions); // Route for getting actions

module.exports = router;
