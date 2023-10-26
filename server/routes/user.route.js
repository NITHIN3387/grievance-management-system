const express = require('express');
const { userRegister,userLogin,getUser, userLogout } = require('../controllers/user.controller');
const authUser = require('../middleware/authUser.middleware');
const authAdmin = require('../middleware/authAdmin.middleware');

const router = express.Router()

router.post('/register', userRegister)          //api for register of a user
router.post('/login', userLogin)          //api for login of a user
router.get('/logout', userLogout)          //api for logout of the user data
router.get('/get-user', authUser, getUser)          //api for getting the user data
router.get('/get-admin', authAdmin, getUser)          //api for getting the user data

module.exports = router