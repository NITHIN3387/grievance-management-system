const express = require('express');
const { uploadStatus, getStatus } = require('../controllers/action.controller'); // Import your actions controller
const uploader = require('../middleware/multer');

const router = express.Router();

// Define routes for the "actions" table
router.post('/upload', uploader.single('action-image'), uploadStatus); // Route for uploading an action
router.get('/get/:id', getStatus); // Route for getting the status of the complaint

module.exports = router;