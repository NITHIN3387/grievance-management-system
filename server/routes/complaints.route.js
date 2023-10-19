const express = require('express');
const { uploadComplaints } = require('../controllers/complaints.controller');
const uploader = require('../middleware/multer');

const router = express.Router()

router.post('/upload', uploader.single("grievance-image"), uploadComplaints)    //api for uploading the problem

module.exports = router