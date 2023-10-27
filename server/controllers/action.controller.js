const { db, firebaseConfig } = require('../config/dbConnection');
const actions = db.collection("actions");

const { initializeApp } = require('@firebase/app')
const { getStorage, getDownloadURL, uploadBytesResumable, ref } = require('@firebase/storage');

// Description: Stores status of the complaint in the "actions" collection
// Method: POST
// Access: Public
const uploadStatus = async (req, res) => {
    initializeApp(firebaseConfig)

    //getting firebase instance for the initialized app
    const storage = getStorage()

    try {
        const { userId, complaintId, status, description } = req.body;
        const photo = req.file || ""

            //<----------------- storing img in firebase cloude storage ----------------------->
            //getting storage refferace to the cloud storage
            const storageRef = ref(storage, "grievance-images/" + Date.now() + "-" + Math.round(Math.random() * 1E9))       //for making a unique name of the photo we use uploaded date and a random number

            //Create file metadata including the content type
            const metadata = {
                contentType: photo.mimetype
            }

            //upload the file in the bucket storage
            await uploadBytesResumable(storageRef, photo.buffer, metadata)
                .then(async (snapshot) => (
                    //get the download url of the image
                    await getDownloadURL(snapshot.ref)
                ))
                .then(async (imageUrl) => {
                    //finding the department to which problem belongs to
                    classifier(description, async (department) => {
                        // Save the data in the complaints collection
                        department && await complaints.add({
                            description,
                            date,
                            department,
                            imageUrl,
                            location,
                            // userId,
                            // userName
                        })
                        .then((data) => {
                            res.status(200).send({ message: "complaint submitted successfully", status: "success", _id: data.id })
                        })
                    })
                })

        // Add the action to the "actions" collection
        await actions.add({
            userId,
            complaintId,
            status,
            description,
            image
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
// Method: GET
// Access: Public
const getStatus = async (req, res) => {
    const id = req.params.id 

    await actions.where('complaintId', '==', id).get()
    .then((doc) => {
        const data = doc.docs.map((doc) => ({_id: doc.id, ...doc.data()}))
        res.status(200).send({message: "status fetched successfully", status: "success", data: data})
    })
    .catch((err) => {
        res.status(500).send({message: "fail to fetch the status of the complaint", status: "fail"})
        console.log(err);
    })
}

module.exports = { uploadStatus, getStatus };