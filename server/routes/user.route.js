const express = require('express');
const { userRegister } = require('../controllers/user.controller');

const router = express.Router()

router.post('/register', userRegister)          //api for register of a user

module.exports = router