const { db } = require('../config/dbConnection');
const actions = db.collection("actions");

// Description: Stores status of the complaint in the "actions" collection
// Method: POST
// Access: Public
const uploadStatus = async (req, res) => {
    try {
        const { userId, complaintId, status, description } = req.body;

        // Add the action to the "actions" collection
        await actions.add({
            userId,
            complaintId,
            status,
            description,
        })

        res.status(200).send({
            message: 'Status added successfully',
            status: 'success',
        });
        
    } catch (error) {
        res.status(500).send({ message: 'Error adding status', status: 'fail' });
        console.error('Error adding status:', error);
    }
};

// Description: Stores status of the complaint in the "actions" collection
// Method: POST
// Access: Public
const getStatus = (req, res) => {

}

module.exports = { uploadStatus, getStatus };
