const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(cors({
    origin: process.env.WEBSITE_LINK,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}))

//express middleware
app.use(express.json())

//api for user registration and authentication
app.use('/user', require('./routes/user.route'))

app.listen(process.env.PORT, () => {
    console.log('server started at the port', process.env.PORT);
})