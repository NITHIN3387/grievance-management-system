const express = require('express');
const { userRegister,userLogin,getUser } = require('../controllers/user.controller');

const router = express.Router()

router.post('/register', userRegister)          //api for register of a user
router.post('/login', userLogin)          //api for login of a user
router.get('/getuser/:id', getUser)          //api for getting the user data

module.exports = router