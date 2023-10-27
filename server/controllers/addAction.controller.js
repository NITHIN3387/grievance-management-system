const { db } = require('../config/dbConnection');


const actions = db.collection("actions");

// Description: Stores status in the "actions" collection
// Method: POST
// Access: Public
const uploadStatus = async (req, res) => {
   
    try {
        const { complaintId, userId, actionDescription, status } = req.body;

        // Add the action to the "actions" collection
        const newActionRef = await actions.add({
            complaintId,
            userId,
            actionDescription,
            status,
        });

        res.status(200).send({
            message: 'Status added successfully',
            status: 'success',
            actionId: newActionRef.id,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error adding status', status: 'fail' });
        console.error('Error adding status:', error);
    }
};

module.exports = { uploadStatus };
