const express = require('express');
const { uploadComplaints } = require('../controllers/complaints.controller');

const router = express.Router()

router.post('/upload', uploadComplaints)    //api for uploading the problem

module.exports = router