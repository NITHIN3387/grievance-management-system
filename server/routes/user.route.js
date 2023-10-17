const express = require('express');
const { userRegister,userLogin } = require('../controllers/user.controller');

const router = express.Router()

router.post('/register', userRegister)          //api for register of a user
router.post('/login', userLogin)          //api for register of a user

module.exports = router