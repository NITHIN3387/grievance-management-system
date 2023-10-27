const express = require('express');
const { uploadStatus, getStatus } = require('../controllers/action.controller'); // Import your actions controller

const router = express.Router();

// Define routes for the "actions" table
router.post('/upload', uploadStatus); // Route for uploading an action
router.post('/get', getStatus); // Route for getting the status of the complaint

module.exports = router;