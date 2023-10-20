const express = require('express');
const { userRegister,userLogin,getUser } = require('../controllers/user.controller');
const authUser = require('../middleware/authUser.middleware');

const router = express.Router()

router.post('/register', userRegister)          //api for register of a user
router.post('/login', userLogin)          //api for login of a user
router.get('/get-user/:id', authUser, getUser)          //api for getting the user data

module.exports = router