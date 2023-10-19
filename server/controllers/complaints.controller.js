const db = require('../config/dbConnection');

// Creating a complaints collection in the database
const complaints = db.collection("complaints");

// Description: Stores problems in the database
// Method: POST
// Access: Private
const uploadComplaints = async (req, res) => {
    try {
        const { description, date, department } = req.body; // Getting the data from request.body

        // Save the data in the complaints collection
        await complaints.add({
            description,
            date,
            department,
        })

    } catch (error) {
        console.error('Error submitting complaint:', error);
        return res.status(500).send({ message: "Error submitting complaint", status: "fail", error: error.message });
    }
};

module.exports = { uploadComplaints };