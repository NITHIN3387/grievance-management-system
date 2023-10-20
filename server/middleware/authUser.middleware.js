const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    //getting the jwt token stored in the cookies
    const token = req.cookies.token

    if (!token) res.status(401).send({messsage: "unauthorised user", status: "fail"})

    //varifying the token stored in cookie with our secreate key
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        // checking whether user is authorised or not 
        if (err)
            res.status(401).send({messsage: "unauthorised user", status: "fail"})
        else {
            req.user = req.params.id
            next()
        }
    })
}

module.exports = authUser