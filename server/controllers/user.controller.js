const bcrypt = require('bcrypt');

const db = require('../config/dbConnection');
const user = db.collection('users')                 //creating a user table in db


//discription: Registration controll
//method: POST
//access: Public
const userRegister = async (req, res) => {
    const {name, email, mobile, address, password} = req.body

    const data = await user.where('email', '==', email).get()               //getting user who has email id which matches the email id get from request
    const duplicateUser = data.docs.map((doc) => doc.data())                //mapping the user data to duplicatedUser variable

    if (duplicateUser.length)               //checking whether the email id get from request is already registered or not
        res.status(409).send({message: 'email already registered', status: 'duplicate'})
    else{
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
                res.status(200).send({msg: 'user details added to db successfully', status: 'success'})
            })
            .catch((err) => {
                res.status(500).send({msg: 'fail to add user details to db', status: 'failure'})
                console.log(err);
            })
        })
        .catch((err) => {
            console.log('fail to hash the password\n', err);
        })
    }
}

module.exports = {userRegister}