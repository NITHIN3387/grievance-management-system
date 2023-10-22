const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {db} = require('../config/dbConnection');
const user = db.collection('users')                 //creating a user table in db


//discription: Registration controll
//method: POST
//access: Public
const userRegister = async (req, res) => {
    const { name, email, mobile, address, password } = req.body

    const data = await user.where('email', '==', email).get()    //getting user who has email id which matches the email id get from request
    const duplicateUser = data.docs.map((doc) => doc.data())                //mapping the user data to duplicatedUser variable

    if (duplicateUser.length)               //checking whether the email id get from request is already registered or not
        res.status(409).send({ message: 'email already registered', status: 'duplicate' })
    else {
        //converting the raw password get from request to a hash code to store in the database
        await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            .then((salt) => (
                bcrypt.hash(password, salt)
            ))
            .then(async (hash) => {
                // adding user details to db 
                await user.add({
                    name,
                    email,
                    mobile,
                    address,
                    password: hash
                })
                    .then(() => {
                        res.status(200).send({ msg: 'user details added to db successfully', status: 'success' })
                    })
                    .catch((err) => {
                        res.status(500).send({ msg: 'fail to add user details to db', status: 'failure' })
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log('fail to hash the password\n', err);
            })
    }
}

//discription: Login controll
//method: POST
//access: Public
const userLogin = async (req, res) => {
    const { email, password } = req.body;   //extract email and password from the request
    const fetchData = await user.where('email', '==', email).get();     //compare if email exists in database
    const userData = fetchData.docs.map((doc) => ({ _id: doc.id, ...doc.data() }))      //map the data

    if (userData.length) {              //checking whether the email id is exist or not in db
        if (await bcrypt.compare(password, userData[0].password)) {     //comparing password with hash code stored in database
            //generate jwt token
            const token = jwt.sign(
                {
                    _id: userData[0]._id,
                    name: userData[0].name,
                    email: userData[0].email
                },
                process.env.SECRET_KEY,
                { expiresIn: '7d' }
            )
            //storing the generated token in cookie
            res.cookie('token', token, {
                maxAge: 604800000,  //7 days
                httpOnly: true,
            })
            .send({ message: "user loged in successfully", data: userData, status: "success"})
        } else
            res.send({ message: "incorrect password", status: "password-err" })
    } else
        res.send({ message: 'incorrect email', status: "email-err" })

}

const userLogout = (req, res) => {
    res.clearCookie('token')
    .status(200)
    .send({message: 'user logged out successfully', status: 'success'})
}

const getUser = async (req, res) => {
    const id = req.user;

    //fetching requested user details from the db
    await user.doc(id).get()
    .then((doc) => {
        if (doc.exists) {
            const userdata = {_id: doc.id, ...doc.data()}     //storing the data in userdata
            delete userdata.password        //deleting the password from the userdata to avoid sending user password
            res.send({message:"user data found", status:"success", data: userdata})
        }
        else 
            res.status(404).send({message:"User with provided id doesnot exist", status:"fail"})
    })
    .catch((error) => {
        res.status(500).send({message:"Internal server error", status:"fail"})
        console.error("Error in getting userdata", error)
    })
}

module.exports = { userRegister, userLogin, userLogout, getUser }