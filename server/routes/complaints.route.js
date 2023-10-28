const express = require('express');

const uploader = require('../middleware/multer');
const { uploadComplaints, getComplaintByDepartment, getComplaintById } = require('../controllers/complaints.controller');
const authAdmin = require('../middleware/authAdmin.middleware');

const router = express.Router()

router.post('/upload', uploader.single("grievance-image"), uploadComplaints)    //api for uploading the complaint
router.get('/get', authAdmin, getComplaintByDepartment)    //api for getting the complaint department wise
router.get('/get/:id', getComplaintById)    //api for getting the complaint by id


module.exports = router