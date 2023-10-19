const db = require('../config/dbConnection')
const complaints = db.collection("complaints")  //creating a complaints table in db

//discription: stores problms in the db
//method: POST
//access: Private
const uploadComplaints = async (req, res) => {
    //description, date, department
}

module.exports = {uploadComplaints}