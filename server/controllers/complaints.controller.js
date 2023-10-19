const db = require('../config/dbConnection')
const complaints = db.collection("complaints")  //creating a complaints table in db

//discription: stores problms in the db
//method: POST
//access: Private
const uploadComplaints = async (req, res) => {
    const { description, date, department } = req.body; //getting the data from request.body
    complaints.add({    //saving the data in complaint table
        description,
        date,
        department
    }).then(()=>{   //checking if complaint is submitted successfully
        res.status(200)
        res.send({message:"Complaint submitted successfully",status:"success"})
    }).catch((error)=>{     //if complaint not submitted
        res.status(500)
        res.send({message:"Data not Submitted to database",status:"fail"})
        res.send(error)
    })
}

module.exports = {uploadComplaints}