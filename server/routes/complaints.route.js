const express = require('express');

const uploader = require('../middleware/multer');
const { uploadComplaints, getComplaintByDepartment } = require('../controllers/complaints.controller');
const authAdmin = require('../middleware/authAdmin.middleware');

const router = express.Router()

router.post('/upload', uploader.single("grievance-image"), uploadComplaints)    //api for uploading the complaint
router.get('/get', authAdmin, getComplaintByDepartment)    //api for getting the complaint department wise

module.exports = router