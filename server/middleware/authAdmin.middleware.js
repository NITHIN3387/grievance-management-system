const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    //getting the jwt token stored in the cookies
    const token = req.cookies.token

    if (!token)
        res.status(401).send({messsage: "unauthorised user", status: "unauthorised"})
    else {
        //varifying the token stored in cookie with our secreate key
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // checking whether user is authorised or not 
            if (err || !decoded.email.split('@')[1].includes('kar.in'))
                res.status(401).send({messsage: "unauthorised user", status: "unauthorised"})
            else {
                req.user = decoded
                next()
            }
        })
    }
}

module.exports = authAdmin